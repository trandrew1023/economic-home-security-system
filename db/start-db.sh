#!/bin/bash
docker stop mysql-e 
docker rm mysql-e
docker run -d -p 33066:3306 \
	--net-alias database --network proxy-net --name mysql-e \
	--mount type=bind,source=/home/sdmay2042/db/my.cnf,target=/etc/my.cnf \
	--mount type=bind,source=/home/sdmay2042/db/data,target=/var/lib/mysql \
	mysql/mysql-server:8.0.19-1.1.15
