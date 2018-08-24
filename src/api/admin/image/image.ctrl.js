import * as ImageApi from 'lib/dockerApi/image';
import request from 'request';
import mkdirp from 'mkdirp';
import { objectToQueryString } from 'lib/utility';
import fs from 'fs-extra';
import tar from 'tar';

const extractNameAndTag = (imageName, registry) => {
  /* imageName.image = post body value */
    const imageNameAndTag = imageName.image.split(':');
    let image = imageNameAndTag[0];
    const tag = imageNameAndTag[1] ? imageNameAndTag[1] : 'latest';
    if (registry) {
        image = registry + '/' + imageNameAndTag[0];
    }

    return {
        image: image,
        tag: tag
    };
}

const extractRepoAndTag = (tagName) => {
    const imageRepoAndTag = extractNameAndTag(tagName);

    return {
        repo: imageRepoAndTag.image,
        tag: imageRepoAndTag.tag
    };
}

export const getImageList = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    try {
        const data = await ImageApi.getImageList(url);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getImageInfo = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const data = await ImageApi.getImageInfo({url, id});
        const history = await ImageApi.getImageHistory({url, id});
        ctx.status = 200;
        ctx.body = { result: { data, history } };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getImageInspectRaw = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const { data } = await ImageApi.getImageInspectRaw({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const tagImage = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;
    const { repo, tag } = extractRepoAndTag(ctx.request.body);

    try {
        const { data } = await ImageApi.tagImage({url, id, repo, tag});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const deleteImage = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const { data } = await ImageApi.deleteImage({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const pruneImage = async ctx => {
    const { endpoint: {url} } = ctx.state.user;

    try {
        const { data } = await ImageApi.pruneImage(url);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}


export const pullImage = socket =>
    (resp, fn) => {
        const { endpoint: { url }} = socket.user;
        const queryString = objectToQueryString(JSON.parse(resp));

        let req = request({
            method: 'POST',
            uri: `${url}/images/create?${queryString}`
        });

        req.on( 'data', data => {
            socket.emit('progress', data.toString());
        });

        req.on('end', _ => {
            socket.emit('done');
        })
    };

export const buildImage = socket =>
     async (resp, fn) => {
        const { endpoint: { url }} = socket.user;

        let params = JSON.parse(resp);
        const timestamp = +new Date();
        const path = `/tmp/dockerfarm/${timestamp}`;

        const removeTempFolder = _ => new Promise((resolve, reject) => {
            fs.remove('/tmp/dockerfarm', err => {
                resolve();
            });
        });

        const makeTempFolder = _ => new Promise((resolve, reject) => {
            mkdirp(path, err => {
                resolve();
            })
        });

        const writeDockerFile = _ => new Promise((resolve, reject) => {
            fs.writeFile(`${path}/Dockerfile`, params.dockerfile, _ => {
                resolve();
            })
        });

        const requestBuild = _ => new Promise((resolve, reject) => {
            let tags = '';

            if ( params.names ) {
                tags = params.names.map( v => (
                    `t=${v}`
                )).join('&');
            }

            let req = request({ method: 'POST',
                uri:`${url}/build?${tags}`,
                body: fs.createReadStream(`${path}/Dockerfile.tar.gz`)
            })

            try {
                req.on('error', _ => {
                    throw 'Error';
                });

                req.on('data', function(data) {
                    socket.emit('progress', data.toString());
                })

                req.on('end', _ => {
                    socket.emit('done');
                    resolve();
                })

            } catch(e) {
                socket.emit('done');
                resolve();
            }

        });


        try {
            await removeTempFolder();
            await makeTempFolder()
            await writeDockerFile();
            await tar.c({
                gzip:true,
                cwd: `${path}`,
                file:`${path}/Dockerfile.tar.gz`,
            },[`Dockerfile`]);
            await requestBuild();
        } catch(e) {
            console.log(e);
        }

    }
