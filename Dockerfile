FROM node:17-alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
WORKDIR /etc/nginx
COPY ./nginx.conf ./nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]