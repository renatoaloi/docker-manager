# docker-manager
Python/Django dashboard manager for docker

## Installation

Create virtual environment:

```
> virtualenv env
```

Activate environment:

(Windows)
```
> .\env\Scripts\activate
```

(Linux/MAC)
```
> source ./env/bin/activate
```

Install requirements:

(Windows)
```
(env) > pip install -r requirements.txt
```

(Linux/MAC)
```
(env) > pip install -r requirements-linux.txt
```

## Start docker virtual machine (tested with docker toolbox):

```
docker-machine start default
```

Check if the environment is up:

```
docker-machine env
```

## Configure Docker API (for Docker toolbox)

Follow instructions in this link to change the port and disable SSL for local testing:
https://stackoverflow.com/questions/40294853/how-to-enable-docker-api-access-from-windows-running-docker-toolbox-docker-mach

## Configure ```settings.py``` 

Change the following lines to reflect your Docker API configuration:

```
DOCKER_API_PROTOCOL = 'http'
DOCKER_API_IP = '192.168.99.101'
DOCKER_API_PORT = 2375
```

## Finish configuration

Run the following commands to finish the configurarion:

```
(env) > python ./manage.py makemigrations
(env) > python ./manage.py migrate
(env) > python ./manage.py collectstatic
```

## Run Django server

Finally run the server:

```
(env) > python manage.py runserver
```

## Install and run React project

Open another terminal window.

Enter the react project directory:

```
> cd react-dashboard
```

NPM install the react app:

```
> npm install
```

Start react app:

```
> npm start
```

And navigate to web address:

```
http://localhost:3000/
```

You are done!