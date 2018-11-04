# DockerFarm-backend

![Build Status](https://jenkins.dockerfarm.io/buildStatus/icon?job=DockerFarm-backend/master)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

![image](https://user-images.githubusercontent.com/2585676/45164345-3824ac00-b22d-11e8-8582-f401e7b9dca8.png)

> DockerFarm is a system that can easily manage a Docker.

> We are currently in beta service
[https://dockerfarm.io](https://dockerfarm.io)

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

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

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
