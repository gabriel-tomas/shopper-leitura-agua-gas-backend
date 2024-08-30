FROM node:20.13.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN apk update && apk add bash && apk add --no-cache curl

COPY . .

RUN chmod +x ./wait-for-db.sh ./entrypoint.sh

CMD ["sh", "/app/entrypoint.sh"]
