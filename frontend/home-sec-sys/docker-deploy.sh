#!/bin/bash
docker login
docker pull firextract/home-sec-sys:master  
docker stop home-sec-sys
docker rm home-sec-sys
docker rmi firextract/home-sec-sys:current  
docker tag firextract/home-sec-sys:master firextract/home-sec-sys:current  
docker run -d -p 8080:80 -p 4430:443 \
	--net-alias frontend --name home-sec-sys \
	--network proxy-net \
	--mount type=bind,source="$(pwd)"/nginx/config,destination=/etc/nginx/ \
	--mount type=bind,source=/media/sdmay2042/Macross/ext-www,destination=/usr/share/nginx/html/ext \
	firextract/home-sec-sys:master
docker image prune -f 
