#!/bin/bash
docker container stop backend 
docker container rm backend
docker build -t backend .
docker run -d -it -p 8081:8000 \
	--net-alias backend --name backend \
	--network proxy-net \
	--workdir /usr/src/app \
	--mount type=bind,source=/media/sdmay2042/Macross/ext-www,destination=/usr/share/nginx/html/ext \
	backend \
	bash -c "pip install -r requirements.txt && python manage.py runserver 0.0.0.0:8000"

