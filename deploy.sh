#!/bin/bash
export yarn_dir="/opt/nodejs/node-v16.19.1-linux-x64/lib/node_modules/yarn/bin"
export pm2_dir="/opt/nodejs/node-v16.19.1-linux-x64/lib/node_modules/pm2/bin"
REPOSITORY=/root/plus-util-front 

cd $REPOSITORY 

$yarn_dir/yarn install

$pm2_dir/pm2 reload all