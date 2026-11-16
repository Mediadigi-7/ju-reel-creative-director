#!/usr/bin/env bash
# Preview only: never pass a production flag or accept arbitrary deployment arguments.
set +x
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo 'Staging not run: configure VERCEL_TOKEN securely in environment settings.' >&2
  exit 2
fi
if [[ -z "${VERCEL_PROJECT_ID:-}" || -z "${VERCEL_ORG_ID:-}" ]]; then
  echo 'Staging not run: resolve the existing project and owner from authorized Vercel metadata, verify its production domain is ju-reel-creative.vercel.app, then set VERCEL_PROJECT_ID and VERCEL_ORG_ID.' >&2
  exit 2
fi
NODE_USE_ENV_PROXY=1 node scripts/verifyStagingTarget.mjs
npm run build
npm test
git diff --check
# Environment selectors target the verified existing project. Default deployment target is Preview.
DO_NOT_TRACK=1 NODE_USE_ENV_PROXY=1 npm exec --yes --cache /workspace/.npm-cache --package=vercel@65.12.1 -- vercel deploy --yes --token "$VERCEL_TOKEN"
