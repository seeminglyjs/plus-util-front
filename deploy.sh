#!/bin/bash
REPOSITORY=/root/plus-util-front 

cd $REPOSITORY 

sudo yarn install 

sudo npx pm2 reload all