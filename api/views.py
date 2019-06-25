from rest_framework import views, response
import docker

# list containers
class list(views.APIView):
    def get(self, request, format=None):
        # get client docker from env
        client = docker.from_env()
        # instantiate empty list of containers
        containers_list = []
        # iterate container list to grab only needed fields
        # to keep payload small
        for container in client.containers.list(all=True):
            print(container)
            print(container.__dict__)
            # append 
            containers_list.append(
                {
                    'id': container.attrs['Id'],
                    'name': container.attrs['Name'],
                    'state': container.attrs['State'],
                    'created': container.attrs['Created'],
                }
            )
        return response.Response(status=200, data={ 'retorno': 'OK', 'containers_list': containers_list })


class start(views.APIView):
    def get(self, request, format=None):
        idx = request.GET.get('idx', '')
        try:
            client = docker.from_env()
            container = client.containers.get(idx[:10])
            container.start()
            return response.Response(status=200, data={ 'retorno': 'OK' })
        except Exception as e:
            return response.Response(status=200, data={ 'retorno': 'ERRO', 'mensagem': str(e) })


class stop(views.APIView):
    def get(self, request, format=None):
        idx = request.GET.get('idx', '')
        try:
            client = docker.from_env()
            container = client.containers.get(idx[:10])
            container.stop()
            return response.Response(status=200, data={ 'retorno': 'OK' })
        except Exception as e:
            return response.Response(status=200, data={ 'retorno': 'ERRO', 'mensagem': str(e) })


class restart(views.APIView):
    def get(self, request, format=None):
        return response.Response(status=200, data={ 'retorno': 'OK' })
