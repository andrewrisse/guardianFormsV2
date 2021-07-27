FROM node:12.22.1-alpine

ARG NODE_ENV="production"

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]
