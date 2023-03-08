#!/bin/bash
REPOSITORY=/root/plus-util-front 

cd $REPOSITORY 

yarn install 

npx pm2 reload all