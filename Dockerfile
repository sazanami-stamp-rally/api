FROM node:22

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma migrate

EXPOSE 3000

CMD ["npm", "run", "start"]
