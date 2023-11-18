FROM node:latest

WORKDIR /src/frontend

COPY package*.json ./


RUN npm up
# run node js 
COPY . .

# RUN npm run build

EXPOSE 3000
CMD ["npm","up"]