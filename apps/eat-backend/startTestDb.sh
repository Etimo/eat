#!/bin/bash

docker run -d -t -i \
    -e MYSQL_ROOT_PASSWORD='root' \
    -e MYSQL_DATABASE='eat' \
    -e MYSQL_USER='mysql-eat' \
    -e MYSQL_PASSWORD='etimo' \
    -h 127.0.0.1 -p 3309:3306 \
    --health-cmd='mysqladmin ping --silent' \
    --name mysql-test mysql:latest

# Sleep and wait for mysql to finish booting up. 8 seconds might not be enough on every machine.
echo Waiting 8sec for container to start...
sleep 8
