FROM node:21 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN bash ./scripts/build_env.sh && \
    npm run build

FROM nginx:1.26.1-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./scripts/nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY ./scripts/entrypoint_env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
