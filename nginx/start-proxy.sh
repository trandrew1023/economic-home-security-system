#!/bin/bash
docker stop reverse-proxy
docker rm reverse-proxy
docker run -d -p 80:80 -p 443:443 \
	--net-alias reverse --name reverse-proxy \
	--network proxy-net \
	--mount type=bind,source="$(pwd)"/config,destination=/etc/nginx/ \
	--mount type=bind,source="$(pwd)"/ssl/certs,destination=/etc/ssl/certs \
	--mount type=bind,source="$(pwd)"/ssl/private,destination=/etc/ssl/private \
	nginx:mainline
