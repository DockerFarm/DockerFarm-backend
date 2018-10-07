import axios from 'axios';
import qs from 'query-string'
import { request } from 'lib/httpClient';
import { get, keys, map } from 'lodash';


export const getServiceList = (url) =>
    axios.get(`${url}/services`)
        .then(resp => {
            const transformObject = v => {
                const targetport = get(v, 'Endpoint.Spec.Ports[0].TargetPort','');
                const publishedport = get(v, 'Endpoint.Spec.Ports[0].PublishedPort','');
                    return {
                        servicename: get(v,'Spec.Name',''),
                        stack: get(v, `Spec.Labels['com.docker.stack.namespace']`,'-'),
                        image: get(v, 'Spec.TaskTemplate.ContainerSpec.Image','').substr(0,get(v, 'Spec.TaskTemplate.ContainerSpec.Image','').indexOf("@")),
                        updatedat: get(v, 'UpdatedAt', '-'),
                        port: {
                                targetport,
                                publishedport
                            },
                        replicated: get(v, 'Spec.Mode.Replicated.Replicas', '-')
                    }
                };
                return resp.data.map(transformObject);
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
                    created: get(data,'CreatedAt', ''),
                    updated: get(data,'UpdatedAt', ''),
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
