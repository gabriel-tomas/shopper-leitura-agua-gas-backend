# Usar a imagem base do Node.js
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install
RUN apk update && apk add bash && apk add --no-cache curl

# Copiar o restante dos arquivos da aplicação
COPY . .

RUN chmod +x ./wait-for-db.sh ./entrypoint.sh

# Comando para rodar as migrações e iniciar o servidor de desenvolvimento
CMD ["sh", "/app/entrypoint.sh"]
