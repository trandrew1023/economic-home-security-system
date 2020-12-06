#!/bin/bash
docker stop mysql-dev 
docker rm mysql-dev
docker run -d -p 33067:3306 \
	--net-alias database --network proxy-net --name mysql-dev \
	--mount type=bind,source=/home/sdmay2042/db-dev/my.cnf,target=/etc/my.cnf \
	--mount type=bind,source=/home/sdmay2042/db-dev/data,target=/var/lib/mysql \
	mysql/mysql-server:8.0.19-1.1.15
