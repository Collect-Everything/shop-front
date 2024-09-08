FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run generate

FROM nginx:alpine

COPY --from=builder /app/.output/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
