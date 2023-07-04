FROM ubuntu:latest
RUN apt update && apt install -y nodejs && apt install -y npm
WORKDIR /var/www

COPY dist ./dist
COPY package.json ./package.json

COPY ./src/server.js ./server.js
RUN npm i

EXPOSE 3000

CMD node server.js
