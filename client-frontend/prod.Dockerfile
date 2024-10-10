FROM node:21.6.1-alpine as build
LABEL group=marketplace-roblox

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

ARG VITE_APP_API
ENV VITE_APP_API=${VITE_APP_API}

ARG VITE_APP_ENCRYPT_KEY
ENV VITE_APP_ENCRYPT_KEY=${VITE_APP_ENCRYPT_KEY}

ARG VITE_APP_HMAC_KEY
ENV VITE_APP_HMAC_KEY=${VITE_APP_HMAC_KEY}

RUN npm run build

FROM nginx:stable-alpine3.20-perl

COPY --from=build /app/dist /usr/share/nginx/html

COPY /nginx/conf.d/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
