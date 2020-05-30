#! /bin/bash

rsync -avz --delete --exclude-from 'deploy_exclude.txt' package.json package-lock.json dist server rss@119.23.46.51:~/project
