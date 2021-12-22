FROM node:lts-alpine
ENV PORT 9000
ENV HOST 0.0.0.0
RUN mkdir -p /app/patches
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
ADD ./patches/ /app/patches
RUN yarn && yarn cache clean
ADD ./ /app
RUN yarn build
ENTRYPOINT ["yarn","start"]
