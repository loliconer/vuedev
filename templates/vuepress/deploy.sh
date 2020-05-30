#! /bin/bash

rsync -avz -e "ssh -p 6666" --delete .vuepress/dist/ scott@112.74.83.47:~/moshui
