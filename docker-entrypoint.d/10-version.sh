#!/bin/sh
set -e

version="${APP_VERSION:-${VITE_APP_VERSION:-dev-local}}"

cat > /usr/share/nginx/html/version.json <<EOF
{"version":"$version"}
EOF
