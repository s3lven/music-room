FROM node:lts-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install --silent --production

COPY backend/ .

EXPOSE 5000

CMD ["npm", "start"]
