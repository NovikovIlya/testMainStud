FROM node:17-alpine as builder
ARG REACT_APP_HOST
ARG REACT_APP_PORT
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npx vite build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
WORKDIR /etc/nginx
COPY ./nginx.conf ./nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]