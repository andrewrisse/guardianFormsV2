FROM node:12.22.1-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build


EXPOSE 8080

CMD [ "node", "dist/src/index.js" ]
