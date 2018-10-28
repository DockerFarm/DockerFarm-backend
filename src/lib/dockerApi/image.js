import axios from 'axios';
import { get, keys, size, reduce, orderBy } from 'lodash';
import * as utility from 'lib/utility';

export const getImageList = (url) =>
    axios.get(`${url}/images/json`)
        .then(resp => {
            const transformObject = v => {
                return {
                    id: get(v,'Id','').substring(7,19),
                    tag: get(v, 'RepoTags[0]','-'),
                    created: utility.getDateFromTimeStamp(get(v, 'Created', '')),
                    size: utility.humanSize(get(v, 'Size', '')),
                }
            };
            return orderBy(resp.data.map(transformObject), ['created','tag'], ['desc','asc']);
    });

export const getUsedImageId = (url) =>
    axios.get(`${url}/containers/json`)
        .then(resp => {
            const transformObject = v => {
                return {
                    usedId: get(v, 'ImageID', '-').substring(7,19)
                }
            };
            return resp.data.map(transformObject);
        })

export const getImageInfo = ({url, id}) =>
    axios.get(`${url}/images/${id}/json`)
        .then( resp => {
            const { data }  = resp;
            return  {
                info : {
                    id: get(data,'Id',''),
                    parent: get(data,'Parent', ''),
                    size: utility.humanSize(get(data, 'Size', '')),
                    created: utility.getDate(get(data, 'Created', '')),
                    dockerversion: get(data, 'DockerVersion', ''),
                    os: get(data, 'Os', ''),
                    architecture: get(data, 'Architecture', ''),
                },
                detail: {
                    volume: keys(get(data, 'Config.Volumes', '')),
                    entrypoint: get(data, 'Config.Entrypoint', '-'),
                    cmd: get(data, 'Config.Cmd', '-'),
                    port: keys(get(data, 'ContainerConfig.ExposedPorts', '')),
                    env: get(data, 'Config.Env', ''),
                }
            }
          });

export const getImageHistory = ({url, id}) =>
    axios.get(`${url}/images/${id}/history`)
        .then( resp => {
            const transformObject = v => {
                return {
                    layer: get(v,'CreatedBy',''),
                    size: utility.humanSize(get(v, 'Size', '')),
                }
            };
            return resp.data.map(transformObject);
    });

export const getSummaryInfo = (url) =>
      axios.get(`${url}/images/json?all=0`)
          .then( resp => {
            const { data } = resp;
            const totalSize  = data.map( v => v.Size);
            return {
                count: size(data),
                totalsize: utility.humanSize(reduce(totalSize, (total, size) => {
                    total = total + size;
                    return total;
                }))
            }
        })

export const searchImage = ({url,query}) => axios.get(`${url}/images/search?term=${query}`).catch(err => console.log(err));

export const getImageInspectRaw = ({url, id}) => axios.get(`${url}/images/${id}/json`);

export const tagImage = ({url, id, repo, tag}) => axios.post(`${url}/images/${id}/tag?force=0&repo=${repo}&tag=${tag}`);

export const pullImage = ({url, image, tag}) => axios.post(`${url}/images/create?fromImage=${image}&tag=${tag}`);

export const deleteImage = ({url, id}) => axios.delete(`${url}/images/${id}`);

export const pruneImage = (url) => axios.post(`${url}/images/prune?filters={"dangling": ["false"]}`);
