FROM node:22-alpine as base

WORKDIR /app
COPY package*.json ./
RUN npm ci

# COPY FILE
COPY . .

# SETUP ENV
ENV NODE_ENV=development

ARG VITE_APP_API
ENV VITE_APP_API=${VITE_APP_API}

ARG VITE_APP_LOGO_URL
ENV VITE_APP_LOGO_URL=${VITE_APP_LOGO_URL}

EXPOSE 1020

CMD ["npm", "run", "dev"]