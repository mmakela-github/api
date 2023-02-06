FROM node:alpine as base

WORKDIR /api

COPY package.json ./

FROM base as prod
RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean
COPY . .
CMD ["node", "./app.js"]
