# Builder: install only what we need to compile native deps (node-pty)
FROM node:24-alpine AS build
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm install --omit=dev

# Runner: small runtime with docker CLI + bash
FROM node:24-alpine AS runner
WORKDIR /app
RUN npm install -g npm@latest && \
    apk add --no-cache docker-cli bash && \
    addgroup -S app && \
    adduser -S -G app app && \
    chown -R app:app /app
COPY --from=build /app/node_modules ./node_modules
COPY server.js .
COPY public ./public

USER app

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "const net=require('net');const s=net.connect(7681,'127.0.0.1',()=>{s.end();process.exit(0)});s.on('error',()=>process.exit(1));setTimeout(()=>process.exit(1),2000);"

EXPOSE 7681
CMD ["node", "server.js"]
