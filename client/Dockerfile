FROM node:12.22.1-alpine as build

ENV NODE_ENV=development


WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile

COPY . ./
EXPOSE 3000

CMD ["yarn", "start"]


