from rest_framework import views, response
import docker

class list(views.APIView):
    def get(self, request, format=None):
        client = docker.from_env()
        containers_list = []
        for container in client.containers.list():
            containers_list.append(
                {
                    'id': container.attrs['Id'],
                    'name': container.attrs['Name'],
                    'state': container.attrs['State'],
                    'created': container.attrs['Created'],
                }
            )
        return response.Response(status=200, data={ 'retorno': 'OK', 'containers_list': containers_list })
