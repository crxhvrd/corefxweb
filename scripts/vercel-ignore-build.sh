#!/usr/bin/env bash
# Vercel "Ignored Build Step" command.
#
#   Exit 1  => proceed with the build (real code change).
#   Exit 0  => skip the build (nothing worth rebuilding for).
#
# The devblog sync commits data/devblog-posts.json to main every few minutes.
# The devblog page fetches that JSON live at runtime (app/devblog/DevBlogClient.tsx),
# so those commits do NOT need a rebuild. Skipping them is what saves the
# Build CPU Minutes that this file exists to stop wasting.
#
# Set it in Vercel: Project → Settings → Git → "Ignored Build Step" →
#   bash scripts/vercel-ignore-build.sh

set -uo pipefail

# No parent commit (first build / shallow clone): build to be safe.
if ! git rev-parse HEAD^ >/dev/null 2>&1; then
  echo "No parent commit found — proceeding with build."
  exit 1
fi

# --quiet: exit 1 if there ARE changes outside the excluded path, else exit 0.
if git diff --quiet HEAD^ HEAD -- . ':(exclude)data/devblog-posts.json'; then
  echo "Only data/devblog-posts.json changed — skipping build (devblog loads live)."
  exit 0
fi

echo "Non-devblog changes detected — proceeding with build."
exit 1
