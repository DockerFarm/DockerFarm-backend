#!/bin/bash
registry='localhost:5000'
image='dockerfarm-backend'

docker build -t ${image} --no-cache .
docker tag ${image} ${registry}/${image}
docker push ${registry}/${image}
docker rmi -f ${image} ${registry}/${image}
