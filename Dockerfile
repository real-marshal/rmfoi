FROM node:18.7.0
RUN corepack enable
WORKDIR /usr/src/app
COPY . .
RUN yarn --immutable
CMD [ "yarn", "build"]