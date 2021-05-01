FROM node:12
WORKDIR /usr/src/backend-image-feed
COPY ./package.json .
RUN npm install --only=prod 