FROM node:carbon

#Create app directory 
WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 3000

cmd ["npm", "start"]