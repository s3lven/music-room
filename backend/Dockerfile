FROM node:lts-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install --silent --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
