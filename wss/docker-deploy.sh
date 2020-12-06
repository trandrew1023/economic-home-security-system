#!/bin/bash
docker container stop media-server 
docker container rm media-server
docker build -t media-server .
docker run -it -d\
	--name media-server \
	--network host \
	--workdir /usr/src/app \
	--mount type=bind,source=/media/sdmay2042/Macross/ext-www,destination=/usr/src/app/recordings \
	media-server \
	/bin/bash

