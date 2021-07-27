FROM node:12.22.1-alpine as build

ENV NODE_ENV=production
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
