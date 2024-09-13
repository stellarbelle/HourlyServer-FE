VERSION 0.8

ARG --global --required NODE_VERSION

ci:
    BUILD +lint
    BUILD +test

deps:
    FROM node:${NODE_VERSION}-bullseye-slim

    WORKDIR /src
    COPY package.json /src/
    COPY package-lock.json /src/
    RUN npm install

devdeps:
    FROM +deps

    RUN npm install --include dev

test:
    FROM +devdeps

    COPY . .

    ENV CI=true

    RUN npm run test

lint:
    FROM +devdeps

    COPY . .

    RUN npm run lint

build:
    FROM +deps

    COPY . .
    RUN npm run build
    SAVE ARTIFACT build AS LOCAL build

generate-graphql:
    FROM +deps

    COPY . .
    RUN npm run generate-graphql

    SAVE ARTIFACT ./src/gql/sdk.ts AS LOCAL ./src/gql/sdk.ts

docker:
    FROM nginx:1.25.4-alpine3.18-perl

    COPY +build/build/ /usr/share/nginx/html
    RUN rm /usr/share/nginx/html/settings.json
    RUN rm /etc/nginx/conf.d/default.conf
    COPY hacks/site.conf /etc/nginx/conf.d/site.conf

    ARG --required IMAGE_NAME
    ARG LATEST_IMAGE_NAME=""
    SAVE IMAGE --push $IMAGE_NAME $LATEST_IMAGE_NAME
