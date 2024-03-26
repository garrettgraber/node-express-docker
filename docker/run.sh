#!/bin/bash


./build.sh
# echo "Deleting "
docker rm -f node-express-docker 
echo "Running node-express-docker..."

# docker run -it --name node-express-docker \
	# --env NODE_ENV=development \
	# -v /${PWD}/../://root/app \
	# -p 5000:5000 \
	# node-express-docker /bin/bash

docker run --name node-express-docker --env NODE_ENV=development -v /${PWD}/../://root/app -p 5000:5000 -p 80:5000 node-express-docker
