import axios from 'axios';
import { get, keys, size, reduce, orderBy} from 'lodash';

export const getNetworkList = (url) =>
    axios.get(`${url}/networks`)
        .then(resp => {
              const formatDate = date => date.split('T')[0] + ' ' + date.split('T')[1];
              const transformObject = v => {
                  return {
                    id: get(v, 'Id', '').slice(0,12),
                    name: get(v,'Name',''),
                    scope: get(v,'Scope','-'),
                    driver: get(v,'Driver','-'),
                    ipamdriver: get(v, 'IPAM.Driver','-'),
                    subnet: get(v, 'IPAM.Config[0].Subnet','-'),
                    gateway: get(v, 'IPAM.Config[0].Gateway','-'),
                    createdAt: formatDate(get(v, 'Created', 'T.').split('.')[0])
                  }
              };
              return orderBy(resp.data.map(transformObject), ["createdAt", "name"], ["desc", "asc"]);
        });

export const getNetworkInfo = (url, id) =>
    axios.get(`${url}/networks/${id}`)
        .then(resp => {
            const { data } = resp;
            const containers = keys(get(data, 'Containers', ''));


              return {
                network : {
                    name: get(data,'Name',''),
                    id: get(data,'Id', ''),
                    driver: get(data,'Driver', ''),
                    scope: get(data,'Scope', ''),
                    subnet: get(data, 'IPAM.Config[0].Subnet','-'),
                    gateway: get(data, 'IPAM.Config[0].Gateway','-'),
                },
                options: get(data, 'Options'),
                container: containers.map( v => ({
                    id: v,
                    name: get(data, `Containers.${v}.Name`, ''),
                    ipv4: get(data, `Containers.${v}.IPv4Address`, '-'),
                    ipv6: get(data, `Containers.${v}.IPv6Address`, '-'),
                    mac: get(data, `Containers.${v}.MacAddress`, '-'),
                }))
              }
          });

export const disconnectNetwork = ({url, id, form}) => axios.post(`${url}/networks/${id}/disconnect`, {
    "Container": form.id,
    "Force": true
});
export const getNetworkInspectRaw = ({url, id}) => axios.get(`${url}/networks/${id}`);
export const deleteNetwork = ({url, id}) => axios.delete(`${url}/networks/${id}`);
export const createNetwork = (url, form) => axios.post(`${url}/networks/create`, {
    "CheckDuplicate": true,
	"Driver" : form.driver,
	"IPAM": {
		"Driver": "default",
		"config": [{
			"Subnet": form.subnet,
			"Gateway": form.gateway
		}]
	},
	"Internal": form.internal,
	"Labels": reduce(form.labels, (acc, obj) => {
        acc[obj.key] = obj.value;
        return acc;
    },{}),
	"Name": form.name,
	"Options": reduce(form.options, (acc, obj) => {
        acc[obj.key] = obj.value;
        return acc;
    },{})
});

export const getSummaryInfo = (url) =>
    axios.get(`${url}/networks`)
        .then( resp => {
            const { data } = resp;
            return {
                count: size(data)
            }
        });
