#!/bin/bash
registry='localhost:5000'
image='dockerfarm-backend'

docker pull ${registry}/${image}
docker rm -f ${image} || true
docker run -d -p 3000:3000  \
    --restart always \
    --name ${image} \
    --link mongodb \
    -v /home/dockerfarm/dockerfarm-backend/production.env:/usr/src/app/env/production.env \
    ${registry}/${image}
