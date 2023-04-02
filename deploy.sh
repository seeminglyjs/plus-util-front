#!/bin/bash
export NODE_HOME=/opt/nodejs/node/bin
export PATH=$PATH:$NODE_HOME
#export yarn_dir="/opt/nodejs/node-v16.19.1-linux-x64/lib/node_modules/yarn/bin"
export pm2_dir="/opt/nodejs/node-v16.19.1-linux-x64/lib/node_modules/pm2/bin"

ROOT=/root
PROJECT_FOLDER=plus-util-front
ORIGIN=/home/seeminglyjs/actions-runner-front/_work/plus-util-front/plus-util-front

cd $ROOT
rm -rf $PROJECT_FOLDER
cp -r $ORIGIN $ROOT
cd $PROJECT_FOLDER

pm2 restart plus-util