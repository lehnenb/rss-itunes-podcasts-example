# Build image
# -------------
FROM node:lts-alpine3.12 as repo-build

# Set up supervisord, install nginx, redis
RUN apk update && \
    apk add --no-cache alpine-sdk supervisor nginx redis

USER root

RUN mkdir /run/nginx

WORKDIR /app

# Copy all projects
COPY server /app/server
COPY consumer /app/consumer
COPY api_types /app/api_types

# Collect monorepo dependencies files
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY integration_tests/application/config/consumer-dotenv /app/consumer/.env
COPY integration_tests/application/config/server-dotenv /app/server/.env

RUN yarn install

# Backend build
# --------------
FROM repo-build as backend-build

WORKDIR /app/server
RUN yarn run build

# Frontend image
# --------------

FROM repo-build as frontend-build

# Build consumer application
WORKDIR /app/consumer
RUN mkdir /dist
RUN NODE_ENV=development yarn run parcel build src/index.html -d /dist

# Full application image
# --------------

FROM backend-build

WORKDIR /app

# Copy configuration and application files
COPY integration_tests/application/config/supervisord.conf /etc/supervisord.conf
COPY integration_tests/application/config/nginx.conf /etc/nginx/nginx.conf
COPY integration_tests/application/config/start-server.sh /start-server.sh
COPY --from=frontend-build /dist /www/consumer

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
