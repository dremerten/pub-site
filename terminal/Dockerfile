FROM node:20-alpine

WORKDIR /app

# Install docker CLI + build deps for node-pty + bash for shell sessions
RUN apk add --no-cache docker-cli python3 make g++ bash

COPY package*.json ./
RUN npm install --production

COPY server.js .
COPY public ./public

EXPOSE 7681
CMD ["node", "server.js"]
