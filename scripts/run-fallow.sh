#!/usr/bin/env bash
# Run fallow dead-code analysis. Output goes to tmp/fallow-report.txt (gitignored).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

docker run --rm \
  -v "$REPO_ROOT:/workspace" \
  -w /workspace \
  node:26-alpine3.23 \
  sh -c "npx fallow 2>&1" | tee "$SCRIPT_DIR/fallow-report.txt"
