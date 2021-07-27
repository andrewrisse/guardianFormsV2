FROM node:12.22.1-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --production

COPY . .

EXPOSE 80

CMD ["yarn", "start"]
