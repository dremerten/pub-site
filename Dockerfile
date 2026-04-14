# ---- Build Stage ----
FROM node:24.14.1-alpine AS build

ARG VITE_QUIZ_TERMINAL_URL
ARG VITE_APP_VERSION

WORKDIR /app

COPY package*.json ./

RUN apk upgrade --no-cache

RUN npm install && \
    npm cache clean --force

COPY . .

RUN VITE_QUIZ_TERMINAL_URL=${VITE_QUIZ_TERMINAL_URL} VITE_APP_VERSION=${VITE_APP_VERSION} npm run build && \
    find dist -name "*.map" -delete && \
    apk add --no-cache brotli && \
    find dist -type f -name "*.js" -exec brotli -Z {} \; && \
    find dist -type f -name "*.css" -exec brotli -Z {} \;

# ---- Runtime Stage ----
FROM nginx:1.27-alpine-slim

RUN apk upgrade --no-cache && \
    addgroup -S app && \
    adduser -S -G app app && \
    mkdir -p /var/cache/nginx /var/run /tmp && \
    chown -R app:app /var/cache/nginx /var/run /tmp /usr/share/nginx/html && \
    sed -i 's#^user .*;#\# user disabled: running as non-root user app#' /etc/nginx/nginx.conf && \
    if grep -q '^pid ' /etc/nginx/nginx.conf; then \
      sed -i 's#^pid .*;#pid /tmp/nginx.pid;#' /etc/nginx/nginx.conf; \
    else \
      printf '\npid /tmp/nginx.pid;\n' >> /etc/nginx/nginx.conf; \
    fi

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx-container.conf /etc/nginx/conf.d/default.conf
COPY --chmod=0755 docker-entrypoint.d/10-version.sh /docker-entrypoint.d/10-version.sh

RUN chown -R app:app /usr/share/nginx/html /etc/nginx/conf.d

USER app

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:80/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
