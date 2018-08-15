import axios from 'axios';
import { get, keys} from 'lodash';

export const getNetworkList = (url) =>
    axios.get(`${url}/networks`)
        .then(resp => {
          const transformObject = v => {
              return {
                name: get(v,'Name',''),
                scope: get(v,'Scope','-'),
                driver: get(v,'Driver','-'),
                ipamdriver: get(v, 'IPAM.Driver','-'),
                subnet: get(v, 'IPAM.Config[0].Subnet','-'),
                gateway: get(v, 'IPAM.Config[0].Gateway','-'),
              }
          };
          return resp.data.map(transformObject);
        });

export const getNetworkInfo = (url, id) =>
    axios.get(`${url}/networks/${id}`)
        .then(resp => {
            const { data } = resp;
            const id = keys(get(data, 'Containers', ''));


              return {
                network : {
                    name: get(data,'Name',''),
                    id: get(data,'Id', ''),
                    driver: get(data,'Driver', ''),
                    scope: get(data,'Scope', ''),
                    subnet: get(data, 'IPAM.Config[0].Subnet','-'),
                    gateway: get(data, 'IPAM.Config[0].Gateway','-'),
                },
                container: {
                    name: get(data, `Containers.${id}.Name`, ''),
                    ipv4: get(data, `Containers.${id}.IPv4Address`, '-'),
                    ipv6: get(data, `Containers.${id}.IPv6Address`, '-'),
                    mac: get(data, `Containers.${id}.MacAddress`, '-'),
                }
              }
      });

export const getNetworkInspectRaw = ({url, id}) => axios.get(`${url}/networks/${id}`);
export const deleteNetwork = ({url, id}) => axios.delete(`${url}/networks/${id}`);
export const createNetwork = (url, form) => axios.post(`${url}/networks/create`, form);
