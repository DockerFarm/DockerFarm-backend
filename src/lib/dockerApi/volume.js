import axios from 'axios';
import { get, keys, size, reduce, isBoolean, orderBy} from 'lodash';

export const getVolumeList = (url) =>
    axios.get(`${url}/volumes`)
        .then(resp => {
          const transformObject = v => {
              return {
                name: get(v,'Name',''),
                driver: get(v,'Driver','-'),
                mountpoint: get(v,'Mountpoint','-'),
                createdAt: get(v, 'CreatedAt', '')
              }
          };
          return orderBy(resp.data.Volumes.map(transformObject),['createdAt', 'name'], ['desc','asc']);
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


export const getVolumeRelateContainer = (url, id) =>
    axios.get(`${url}/containers/json?all=1&filters={"volume": ["${id}"]}`)
        .then(resp => {
            const transformObject = v => {
                const mount = get(v, 'Mounts[0]', '');
                return {
                    name: get(v, 'Names[0]', '').substring(1),
                    mountat: get(mount, 'Destination', ''),
                    readonly: isBoolean(v, 'RW', ''),
                }
            };
            return resp.data.map(transformObject);
        });
        
export const getVolumeInspectRaw = (url, id) => axios.get(`${url}/volumes/${id}`);

export const getVolumeDriver = (url) =>
    axios.get(`${url}/info`)
        .then( resp => {
            const { data } = resp;

            return {
                Driver: get(data, 'Plugins.Volume', '' ),
            }
        });

export const deleteVolume = (url, id) => axios.delete(`${url}/volumes/${id}`);

export const createVolume = (url, form) => axios.post(`${url}/volumes/create`, {
    "Name" : form.name,
    "Driver" : form.driver,
    "DriverOpts": reduce(form.options, (acc, obj) => {
        acc[obj.key] = obj.value;
        return acc;
    },{})
});

export const getSummaryInfo = (url) =>
    axios.get(`${url}/volumes`)
        .then( resp => {
            const { data } = resp;
            return {
              count: size(data.Volumes)
            }
        })
