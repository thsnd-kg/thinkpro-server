FROM node:18-alpine

WORKDIR /backend/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

CMD [ "node", "dist/main.js" ]