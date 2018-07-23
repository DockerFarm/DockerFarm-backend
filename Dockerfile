FROM node:carbon

#Create app directory 
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY . ./

RUN npm --production=false install

EXPOSE 3000

cmd ["npm", "start"]