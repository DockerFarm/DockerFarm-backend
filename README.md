# DockerFarm-backend

![Build Status](http://jenkins.dockerfarm.io/buildStatus/icon?job=DockerFarm-backend/master)

![image](https://user-images.githubusercontent.com/2585676/45164345-3824ac00-b22d-11e8-8582-f401e7b9dca8.png)

> DockerFarm is a system that can easily manage a Docker.

## Demo Image
![image](https://user-images.githubusercontent.com/2585676/47604376-f3024680-da33-11e8-8ea5-7dcae9eee3cb.png)

## ✨ Feature

- [x] DashBoard
- [x] EndPoint Management
- [x] Registry Management
- [x] Container Management
- [x] Image Management
- [x] Volumne Management
- [x] Network Management
- [x] Swarm Management
- [x] Event Log

## Built With

* koa
* passport
* socket.io
* axios
* joi
* mongoose

## Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.


## Development Setup

1. First, Install [yarn](https://yarnpkg.com/en/) global


2. Second, Clone this Project & Install node module via yarn

```sh
//clone project
git clone https://github.com/DockerFarm/DockerFarm-backend.git

//move project folder
cd DockerFarm-backend

//install node module
yarn
```

3. Finally, write env file and input your config information

development - dev.env

production - production.env

```sh
JWT_SECRET=
SHA256_SECRET=
MONGO_URL=
FRONT_URL=
PORT=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=
```

## License

This project is licensed under the MIT License
