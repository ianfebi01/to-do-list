#FROM node:18.16.0-alpine as build

#WORKDIR /usr/app

#COPY . /usr/app

#RUN yarn install

#RUN yarn build

#CMD 	["yarn", "start"]

FROM node:18-alpine as builder
WORKDIR /my-space
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
FROM node:18-alpine as runner
WORKDIR /my-space
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/yarn.lock .
COPY --from=builder /my-space/next.config.js ./ 
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
