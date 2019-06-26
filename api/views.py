from rest_framework import views, response
from dockermanager import settings
import requests

# list containers
class list(views.APIView):
    def get(self, request, format=None):
        # get list from Docker API
        url = '{}://{}:{}/containers/json?all=1'.format(settings.DOCKER_API_PROTOCOL,
            settings.DOCKER_API_IP, settings.DOCKER_API_PORT) 
        # call the Docker API
        res = requests.get(url)
        # get containers from returned json
        containers = res.json()
        # instantiate empty list of containers
        containers_list = []
        # iterate container list to grab only needed fields
        # to keep payload small
        for container in containers:
            print(container)
            # print(container.__dict__)
            # append 
            containers_list.append(
                {
                    'id': container['Id'],
                    'name': container['Names'][0],
                    'state': container['State'],
                    'status': container['Status'],
                }
            )
        return response.Response(status=200, data={ 'retorno': 'OK', 'containers_list': containers_list })


class start(views.APIView):
    def get(self, request, format=None):
        idx = request.GET.get('idx', '')
        status, res = Helper.send_command('start', idx)
        return response.Response(status=status, data=res)


class stop(views.APIView):
    def get(self, request, format=None):
        idx = request.GET.get('idx', '')
        status, res = Helper.send_command('stop', idx)
        return response.Response(status=status, data=res)


class Helper:
    def send_command(command, idx):
        try:
            url = '{}://{}:{}/containers/{}/{}'.format(settings.DOCKER_API_PROTOCOL,
                settings.DOCKER_API_IP, settings.DOCKER_API_PORT, idx, command) 
            # call the Docker API
            res = requests.post(url)
            # Check if status code is 204 or 304 (both ok)
            if res.status_code != 204 and res.status_code != 304:
                return (200, { 'retorno': 'ERRO', 'mensagem': res.json()['message'] },)
            else:
                return (200, { 'retorno': 'OK' },)
        except Exception as e:
            return (200, { 'retorno': 'ERRO', 'mensagem': str(e) },)