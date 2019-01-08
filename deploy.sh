#!/usr/bin/env bash

APP_HOST=${APP_HOST}
REMOTE_DIR=/opt/esports
RSYNC_FLAGS="--exclude=.idea --exclude=venv --exclude=frontend/node_modules --exclude=.git --exclude=etc -av"

function enable_firewall {
    ssh root@${1} "ufw allow 22/tcp && ufw allow 2376/tcp && ufw allow 7946/tcp && ufw allow 7946/udp && ufw allow 4789/udp"
    ssh root@${1} "ufw reload"
    ssh root@${1} "ufw enable"
    ssh root@${1} "systemctl restart docker"
}

# Run once
# enable_firewall ${APP_HOST}

# frontend build
cd frontend && npm run build && cd ..

# build / deploy
rsync ${RSYNC_FLAGS} . root@${APP_HOST}:${REMOTE_DIR}
ssh root@${APP_HOST} "docker build -t purchases_popups_web:latest ${REMOTE_DIR}"

# stop and run
ssh root@${APP_HOST} "docker stop popups_web && docker rm popups_web"
ssh root@${APP_HOST} "docker run -d -p 80:5000 --name popups_web purchases_popups_web"
