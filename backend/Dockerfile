FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --production

COPY . .

EXPOSE 80

CMD [ "node", "dist/src/index.js" ]
