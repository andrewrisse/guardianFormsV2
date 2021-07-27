FROM nginx:stable-alpine
ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY . .
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
