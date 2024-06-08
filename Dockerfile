FROM node:20.9-alpine as base

WORKDIR /app

ARG INTERNAL_PACKAGES_TOKEN
ENV GITHUB_TOKEN=$INTERNAL_PACKAGES_TOKEN

COPY package*.json ./

COPY .npmrc .

RUN npm ci --only=production --silent --force

EXPOSE 3333

ENV PATH /app/node_modules/.bin:$PATH



# Development
FROM base as dev

ENV NODE_ENV=development

RUN npm ci --only=development --silent --force

COPY . .



# Production build
FROM dev as build

RUN npm run build

RUN rm -rf src
RUN rm -rf test



# Production
FROM base as prod

ARG IMAGE_TAG
ENV IMAGE_TAG=$IMAGE_TAG

COPY --from=build /app/ .

CMD ["node", "./dist/main.js"]
