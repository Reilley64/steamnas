FROM node:latest as build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install --global pnpm && pnpm install
COPY . .

RUN pnpm run build

FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build app/dist /usr/share/nginx/html

EXPOSE 80
