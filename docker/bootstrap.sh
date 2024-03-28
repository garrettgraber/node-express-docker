#!/bin/bash

echo "Bootstrap is running..."
echo "Link in preinstalled packages...";
rm -rf /root/app/node_modules
ln -s /root/node_modules /root/app/node_modules
echo "npm starting the app...";

# echo "Current directory: $PWD"
ls

cd /root/app
# npm ls --depth=0
# echo "Current directory: $PWD"
ls

echo
which npm
which node
which bash
echo "Node Version" $(node --version)
echo "NPM Version" $(npm --version)
echo

# npm ls --depth=0

chmod -R 0777 /tmp
echo "Tailing the service..."
# tail -f /root/app/app.log
# echo "Current directory: $PWD"
ls

# npm ls --depth=0;
# npm ls -g --depth=0;

echo "Current directory: $PWD"
ls
echo "Current node environment: $NODE_ENV"
# echo "Run status in bootstrap: $RUN_STATUS"

if [ "$NODE_ENV" == "compile" ]; then
  echo "Compiling Node Express Server for production..."
  npm run build 
fi

# if [ "$NODE_ENV" == "production" ]; then
# 	echo "Runing production Node Express Server"
# 	npm run production
# fi

if [ "$NODE_ENV" == "development" ]; then
  echo "Starting Node Express Server..."
  # npm start
  npm run dev
fi
