# ---- Build Stage ----
FROM node:25.1.0-alpine AS build

ARG VITE_QUIZ_TERMINAL_URL

WORKDIR /app

COPY package*.json ./

RUN npm install && \
    npm cache clean --force

COPY . .

RUN VITE_QUIZ_TERMINAL_URL=${VITE_QUIZ_TERMINAL_URL} npm run build && \
    find dist -name "*.map" -delete && \
    apk add --no-cache brotli && \
    find dist -type f -name "*.js" -exec brotli -Z {} \; && \
    find dist -type f -name "*.css" -exec brotli -Z {} \;

# ---- Runtime Stage ----
FROM nginx:1.27-alpine-slim

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx-container.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
