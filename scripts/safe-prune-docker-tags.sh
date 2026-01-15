#!/usr/bin/env bash
set -euo pipefail

# Safe prune helper: lists tags that appear safe to delete based on what's deployed.
# Requirements: kubectl, jq, Docker Hub credentials via env (if using API listing).
# Notes:
# - It NEVER deletes anything. It only prints suggestions.
# - Keep your current/previous prod semver tags and anything deployed.

HUB_USER="${HUB_USER:-${DOCKERHUB_USERNAME:-}}"
HUB_REPO="${HUB_REPO:-dremer10/pub-site}"
KEEP_SEMVER_COUNT="${KEEP_SEMVER_COUNT:-3}"   # keep latest N semver tags

if ! command -v kubectl >/dev/null 2>&1; then
  echo "kubectl is required on PATH." >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required on PATH." >&2
  exit 1
fi

echo "Gathering deployed image tags from the cluster..."
DEPLOYED_IMAGES=$(kubectl get deploy -A -o=jsonpath='{range .items[*]}{.spec.template.spec.containers[*].image}{"\n"}{end}' | sort -u)
echo "$DEPLOYED_IMAGES" | sed 's/^/  - /' | sed '1s/^/Deployed images:\n/'

echo
echo "Extracting deployed tags..."
DEPLOYED_TAGS=$(echo "$DEPLOYED_IMAGES" | sed 's/.*://')
echo "$DEPLOYED_TAGS" | sort -u | sed 's/^/  - /' | sed '1s/^/Deployed tags:\n/'

echo
echo "Fetching Docker Hub tags for $HUB_REPO..."
HUB_TAGS=$(curl -fsSL "https://hub.docker.com/v2/repositories/${HUB_REPO}/tags/?page_size=100" | jq -r '.results[].name' | sort -V)
echo "$HUB_TAGS" | sed 's/^/  - /' | sed '1s/^/All Hub tags:\n/'

echo
echo "Identifying semver tags..."
SEMVER_TAGS=$(echo "$HUB_TAGS" | grep -E '^[0-9]+\.[0-9]+$' || true)
KEEP_SEMVER=$(echo "$SEMVER_TAGS" | sort -V | tail -n "$KEEP_SEMVER_COUNT")
echo "$KEEP_SEMVER" | sed 's/^/  - /' | sed '1s/^/Keep semver tags (latest '"$KEEP_SEMVER_COUNT"'):\n/'

echo
echo "Computing candidates for removal..."
SAFE_DELETE=$(comm -23 <(echo "$HUB_TAGS") <(
  {
    echo "$DEPLOYED_TAGS"
    echo "$KEEP_SEMVER"
    echo "latest"
  } | sort -u
))

echo "$SAFE_DELETE" | sed 's/^/  - /' | sed '1s/^/Safe-to-delete candidates (verify manually):\n/'

cat <<'EOF'

Next steps:
1) Double-check the candidates; ensure none are in use by other clusters/environments.
2) Delete tags via Docker Hub UI or API if safe.
3) Consider keeping a few recent commit-* tags if active dev work is ongoing.
EOF
