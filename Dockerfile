FROM node:8.16.2-alpine

MAINTAINER Rahul sinha

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app


CMD npm run start
EXPOSE 3000  