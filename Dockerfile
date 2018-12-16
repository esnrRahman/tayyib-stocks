FROM node:8.12.0

RUN mkdir /usr/src/tayyib-stocks
WORKDIR /usr/src/tayyib-stocks

COPY package.json package.json

COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

CMD ["npm", "start"]
