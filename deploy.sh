#!/bin/sh

# read vars from .env.deploy file
export $(egrep -v '^#' .env.deploy | xargs)

echo "Deploying to app '$DOKKU_APP' at $DOKKU_HOST"

npm run build
tar -c dist/ Dockerfile CHECKS | ssh "dokku@$DOKKU_HOST" tar:in "$DOKKU_APP"
