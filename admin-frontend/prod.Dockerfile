FROM node:21.6.1-alpine as build
LABEL group=marketplace-roblox

WORKDIR /app

COPY package*.json ./

RUN npm install --no-proxy

COPY . .

ENV NODE_ENV=production

ARG VITE_APP_API
ENV VITE_APP_API=${VITE_APP_API}

ARG VITE_APP_LOGO_URL
ENV VITE_APP_LOGO_URL=${VITE_APP_LOGO_URL}

RUN npm run build

FROM nginx:stable-alpine3.20-perl

COPY --from=build /app/dist /usr/share/nginx/html

COPY /nginx/conf.d/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
