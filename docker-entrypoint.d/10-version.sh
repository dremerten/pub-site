#!/bin/sh
set -e

version="${APP_VERSION:-${VITE_APP_VERSION:-dev-local}}"
target_dir="/usr/share/nginx/html"
target_file="${target_dir}/version.json"

if [ -w "${target_dir}" ]; then
  cat > "${target_file}" <<JSON
{"version":"${version}"}
JSON
else
  echo "10-version.sh: warn: ${target_dir} is not writable; skipping version.json generation" >&2
fi
