import axios from 'axios';
import qs from 'query-string'
import { request } from 'lib/httpClient';
import { get, keys, map, orderBy } from 'lodash';


export const getServiceList = (url) =>
    axios.get(`${url}/services`)
        .then(resp => {
            const formatDate = date => date.split('T')[0] + ' ' + date.split('T')[1];
            const transformObject = v => {
				const ports = get(v, 'Endpoint.Spec.Ports',[]);
                    return {
						id: get(v, 'ID', ''),
                        name: get(v,'Spec.Name',''),
                        stack: get(v, `Spec.Labels['com.docker.stack.namespace']`,'-'),
                        image: get(v, 'Spec.TaskTemplate.ContainerSpec.Image','').substr(0,get(v, 'Spec.TaskTemplate.ContainerSpec.Image','').indexOf("@")),
                        updatedAt: formatDate(get(v, 'UpdatedAt', 'T.').split('.')[0]),
                        createdAt: formatDate(get(v, 'CreatedAt', 'T.').split('.')[0]),
						port: ports.map(v=>
							({ host: get(v, 'PublishedPort',''), 
								container: get(v,'TargetPort','') })),
						replicated: get(v, 'Spec.Mode.Replicated.Replicas', '-')

                    }
                };
                return orderBy(resp.data.map(transformObject), ['updatedAt', 'name'], ['desc','asc']);
            });

export const getServiceInfo = ({url, id}) =>
    axios.get(`${url}/services/${id}`)
        .then(resp => {
            const { data } = resp;
            const network = get(data, 'Endpoint.VirtualIPs');
              return {
                detail : {
                    name: get(data,'Spec.Name',''),
                    id: get(data,'ID', ''),
                    createdAt: get(data,'CreatedAt', 'T').split('T')[0],
                    updatedAt: get(data,'UpdatedAt', 'T').split('T')[0],
                    version: get(data, 'Version.Index',''),
                    replicas: get(data, 'Spec.Mode.Replicated.Replicas',''),
                    image: get(data, 'Spec.TaskTemplate.ContainerSpec.Image','')
                },
                containerlabels : get(data, 'Spec.TaskTemplate.ContainerSpec.Labels', ''),
                servicelabels: get(data, 'Spec.Labels',''),
                network: map(network, v => {
                                const network = {}
                                network.id = v.NetworkID;
                                network.ipAddr = v.Addr;
                                return network;
                            },{}),
                port: get(data, 'Spec.EndpointSpec.Ports',''),
                mount: get(data, 'Spec.TaskTemplate.ContainerSpec.Mounts', ''),
                constraints: get(data, 'Spec.TaskTemplate.Placement.Constraints', '')
            }
        });

export const getServiceLog = ({url, id, query}) =>
	request({
		method: 'GET',
		url: `${url}/services/${id}/logs?${qs.stringify(query)}`
	})
    
export const deleteService = ({url, id}) => axios.delete(`${url}/services/${id}`);
