FROM node:18-alpine
RUN apk update

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build
RUN ls
CMD ["node", "dist/main.js"]