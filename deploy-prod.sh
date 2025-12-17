#!/bin/bash
set -e

echo "Deploy TarkovTrackerNuxt-fork"

cd "$(dirname "$0")"

git fetch origin
git checkout prod
git pull origin prod

npm install

pm2 start ecosystem.config.cjs || true
pm2 reload ecosystem.config.cjs --update-env
pm2 save

echo "Deploy end"
