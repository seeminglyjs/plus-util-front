#!/bin/bash
export NODE_HOME=/opt/nodejs/node/bin
export PATH=$PATH:$NODE_HOME
export yarn_dir="/opt/nodejs/node-v16.19.1-linux-x64/lib/node_modules/yarn/bin"
export pm2_dir="/opt/nodejs/node-v16.19.1-linux-x64/lib/node_modules/pm2/bin"

ROOT=/root
PROJECT_FOLDER=plus-util-front
REPOSITORY=/root/plus-util-front 
ORIGIN=/home/seeminglyjs/actions-runner-front/_work/plus-util-front/plus-util-front

cd $ROOT
mkdir test1
rm -rf  test2
rm -rf $PROJECT_FOLDER
mkdir $PROJECT_FOLDER
cd $REPOSITORY 

$yarn_dir/yarn install

$pm2_dir/pm2 reload all