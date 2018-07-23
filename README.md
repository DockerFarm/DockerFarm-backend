# DockerFarm-backend

![Build Status](http://jenkins.dockerfarm.cf/buildStatus/icon?job=DockerFarm-backend/master&raw=true)

![image](https://user-images.githubusercontent.com/2585676/40734484-8f5f291c-6473-11e8-8e9e-58add225b45b.png)

DockerFarm is a awesome docker management tool!

This Project deals with the DockerFarm back-end area.

## ✨ Features to be implemented

* EndPoint Management
* Registry Management
* Container Management
* Image Management
* Volumne Management
* Network Management
* Event Log
* DashBoard


## Getting Started

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
JWT_SECRET=[]
SHA256_SECRET=[]
MONGO_URL=[]
PORT=[]
```

