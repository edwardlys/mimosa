# development stage
FROM node:lts-alpine AS development

RUN npm i -g @vue/cli http-server

# builder stage
FROM development AS builder

COPY ./client /app
WORKDIR /app
RUN npm install
RUN npm run build

# production stage
FROM nginx AS production

COPY --from=builder /app/dist /usr/share/nginx/html