ARG VERSION=10.23.1
ARG PORT=4200

FROM node:${VERSION}-slim

RUN npm install

RUN npm start
