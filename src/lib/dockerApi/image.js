import axios from 'axios';
import { get, keys, sum, size, values } from 'lodash';
import * as utility from 'lib/utility/utility';

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
          return resp.data.map(transformObject);
        });

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

export const imageCount = (url) =>
      axios.get(`${url}/images/json?all=0`)
          .then( resp => {
              const { data } = resp;
              const totalSize  = data.map( v => v.Size);
              return {
                  image: size(data),
                  totalsize: utility.humanSize(sum(values(totalSize)))
              }
          })


export const getImageInspectRaw = ({url, id}) => axios.get(`${url}/images/${id}/json`);

export const tagImage = ({url, id, repo, tag}) => axios.post(`${url}/images/${id}/tag?force=0&repo=${repo}&tag=${tag}`);

export const pullImage = ({url, image, tag}) => axios.post(`${url}/images/create?fromImage=${image}&tag=${tag}`);

export const deleteImage = ({url, id}) => axios.delete(`${url}/images/${id}`);
