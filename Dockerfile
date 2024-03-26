FROM node:21-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

FROM node:21-alpine as main

WORKDIR /app

COPY --from=build /app /app

CMD [ "npm", "run", "start:container" ]