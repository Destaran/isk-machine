#!/bin/bash

docker stop $(docker ps -a -q)

yarn install
yarn install --cwd ./backend
yarn install --cwd ./site

docker compose up --build

