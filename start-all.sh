#!/bin/sh
sudo mount /dev/sdb /media/sdmay2042/Macross/
cd db
./start-db.sh
cd ../backend
./docker-deploy.sh
cd ../frontend/home-sec-sys
./docker-deploy.sh
cd ../../nginx
./start-proxy.sh

