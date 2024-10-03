FROM node:20 as base

FROM base as builder

WORKDIR /backend

COPY package.json /backend
COPY yarn.lock /backend

RUN yarn

FROM builder as source

COPY nest-cli.json /backend
COPY tsconfig.json /backend
COPY tsconfig.build.json /backend
COPY .prettierrc /backend 
COPY .eslintrc.js /backend
COPY src /backend
COPY test /backend

FROM source as dev

ENV NODE_OPTIONS=--max-old-space-size=16384
CMD ["yarn", "start:dev"]
