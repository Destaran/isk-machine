FROM node:20 as base

FROM base as builder

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn

FROM builder as source

COPY vite.config.ts /app
COPY tsconfig.json /app
COPY tsconfig.node.json /app
COPY tsconfig.app.json /app
COPY index.html /app
COPY public /app
COPY src /app

FROM source as dev

ENTRYPOINT ["yarn", "run", "dev"]