FROM node:lts-alpine

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install --silent --production

COPY frontend/ .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
