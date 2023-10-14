FROM node:latest

WORKDIR /src/backend

COPY package*.json ./

RUN npm install -g @nestjs/cli && npm install
RUN npm up
COPY . .

RUN npm run build

EXPOSE 3001
