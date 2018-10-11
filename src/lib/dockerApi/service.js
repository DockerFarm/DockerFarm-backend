import axios from 'axios';
import qs from 'query-string'
import { request } from 'lib/httpClient';
import { translateHumantimeToNanos } from 'lib/utility';
import { get, keys, map, reduce } from 'lodash';


export const getServiceList = (url) =>
    axios.get(`${url}/services`)
        .then(resp => {
            const transformObject = v => {
				const ports = get(v, 'Endpoint.Spec.Ports',[]);
                    return {
						id: get(v, 'ID', ''),
                        name: get(v,'Spec.Name',''),
                        stack: get(v, `Spec.Labels['com.docker.stack.namespace']`,'-'),
                        image: get(v, 'Spec.TaskTemplate.ContainerSpec.Image','').substr(0,get(v, 'Spec.TaskTemplate.ContainerSpec.Image','').indexOf("@")),
                        updatedAt: get(v, 'UpdatedAt', 'T-').split('T')[0],
						port: ports.map(v=> 
							({ host: get(v, 'PublishedPort',''), 
								container: get(v,'TargetPort','') })),
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

export const createService = ({url, form}) =>
    axios.post(`${url}/services/create`, {
        "Name": form.serviceName,
        "TaskTemplate": {
            "ContainerSpec": {
                "Image": form.imageName,
                "Mounts": [
                    {
                        "Target": form.volumePath,
                        "Source": form.volumeName,
                        "ReadOnly": form.volumeReadOnly,
                        "Type": form.volumeType,
                        "VolumeOptions": {
                            "DriverConfig": {
                                "Name":"local",
                                "Options":{}
                            },
                            "Labels": null
                        }
                    }
                ],
                "Args": [form.command],
                "Command":[form.entrypoint],
                "User":form.user,
                "Dir":form.workingDir,
                "Env":map(form.env, v => `${v.name}=${v.value}`),
                "Labels":reduce(form.containerLabels, (acc, obj) => {
                    acc[obj.name] = obj.value;
                    return acc;
                },{}),
                "Configs":[],"Secrets":[],
            },
            "LogDriver": {
                "Name": form.loggingDriver,
                "Options":reduce(form.loggingOptions, (acc, obj) => {
                    acc[obj.option] = obj.value;
                    return acc;
                },{}),
            },
            "Placement": form.placement,
            "Resources": {
                "Limits": {},
                "Reservations": {}
            },
            "RestartPolicy": {
                "Condition": form.restartCondition,
                "Delay": translateHumantimeToNanos(form.restartDelay),
                "MaxAttempts": form.restartMaxAttempts,
                "window": form.restartWindow
            }
        },
        "Mode": form.mode,
        "Networks": form.networks,
        "UpdateConfig": {
            "Parallelism": form.parallelism,
            "Delay": form.updateDelay,
            "FailureAction": form.failAction,
            "Order": form.order
        },
        "EndpointSpec": {
            "Ports": [
                {
                    "Protocol": form.portProtocol,
                    "PublishMode": form.portPublishMode,
                    "TargetPort": form.targetPort,
                    "PublishedPort": form.publishedPort,
                }
            ]
        },
        "Labels": reduce(form.serviceLabels, (acc, obj) => {
            acc[obj.name] = obj.value;
            return acc;
        },{}),
    }).catch(err => console.log(err));

export const getServiceLog = ({url, id, query}) =>
	request({
		method: 'GET',
		url: `${url}/services/${id}/logs?${qs.stringify(query)}`
	})

export const deleteService = ({url, id}) => axios.delete(`${url}/services/${id}`);
