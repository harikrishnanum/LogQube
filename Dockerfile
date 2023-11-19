FROM node:18

WORKDIR /app

COPY ./ingestor/package*.json ./

RUN npm install

COPY ./ingestor .

EXPOSE 3000

CMD ["npm", "start"]