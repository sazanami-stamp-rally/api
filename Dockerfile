# Node22
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

CMD ["npm", "run", "seedAndStart"]

EXPOSE 3000

