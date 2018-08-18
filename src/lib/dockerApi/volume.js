import axios from 'axios';
import { get, keys, size } from 'lodash';

export const getVolumeList = (url) =>
    axios.get(`${url}/volumes`)
        .then(resp => {
          const transformObject = v => {
              return {
                name: get(v,'Name',''),
                driver: get(v,'Driver','-'),
                mountpoint: get(v,'Mountpoint','-'),
              }
          };
          return resp.data.Volumes.map(transformObject);
        });
export const getVolumeInfo = (url, id) =>
    axios.get(`${url}/volumes/${id}`)
        .then(resp => {
          const  { data } = resp;
          return {
            volume: {
              name: get(data, 'Name', '-'),
              mountpath: get(data,'Mountpoint', '-'),
              driver: get(data, 'Driver', '-'),
            }
          }
    });
export const getVolumeInspectRaw = (url, id) => axios.get(`${url}/volumes/${id}`);
export const deleteVolume = (url, id) => axios.delete(`${url}/volumes/${id}`);
export const createVolume = (url, form) => axios.post(`${url}/volumes/create`,form);

export const volumeCount = (url) =>
    axios.get(`${url}/volumes`)
        .then( resp => {
            const { data } = resp;
            return {
              volume: size(data.Volumes)
            }
          })
