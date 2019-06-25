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

```
(env) > pip install -r requirements.txt
```

Start docker virtual machine (tested with docker toolbox):

```
docker-machine start default
```

Check if the environment is up:

```
docker-machine env
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