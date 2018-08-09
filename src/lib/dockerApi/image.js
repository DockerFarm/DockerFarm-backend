import axios from 'axios';
import { get, keys, forIn, filter } from 'lodash';
import moment from 'moment';

/* Convert File Size  */
const imageSize = (size) => {
  const num = Math.floor( Math.log(size) / Math.log(1024));
  return ( size / Math.pow(1024, num) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][num];
}

/* Convert UNIX Time Stamp to ISO DATE and Date Format */
const getDateFromTimeStamp = (timestamp) => {
  return moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

const getDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
}

export const getImageList = (url) =>
    axios.get(`${url}/images/json`)
        .then(resp => {
          const transformObject = v => {
              return {
                  id: get(v,'Id','').substring(7,19),
                  tag: get(v, 'RepoTags[0]','-'),
                  created: getDateFromTimeStamp(get(v, 'Created', '')),
                  size: imageSize(get(v, 'Size', '')),
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
                    size: imageSize(get(data, 'Size', '')),
                    created: getDate(get(data, 'Created', '')),
                    dockerversion: get(data, 'DockerVersion', ''),
                    os: get(data, 'Os', ''),
                    architecture: get(data, 'Architecture', ''),
                },
                detail: {
                    volume: keys(get(data, 'Config.Volumes', '')),
                    entrypoint: get(data, 'Config.Entrypoint', ''),
                    port: keys(get(data, 'ContainerConfig.ExposedPorts', '')),
                    env: get(data, 'Config.Env', ''),
                }
            }
          });

export const getImageHistory = ({url, id}) => axios.get(`${url}/images/${id}/history`)
  .then( resp => resp.data);
export const getImageInspectRaw = ({url, id}) => axios.get(`${url}/images/${id}/json`);
