# Builder: install only what we need to compile native deps (node-pty)
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json ./
# Use npm install to tolerate missing lockfile
RUN npm install --omit=dev

# Runner: small runtime with docker CLI + bash
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache docker-cli bash
COPY --from=build /app/node_modules ./node_modules
COPY server.js .
COPY public ./public

EXPOSE 7681
CMD ["node", "server.js"]
