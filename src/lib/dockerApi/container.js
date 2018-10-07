import axios from 'axios';
import qs from 'query-string'
import moment from 'moment';
import { humanSize } from 'lib/utility';
import { request } from 'lib/httpClient';
import { get, keys, isArray, filter, map, reduce } from 'lodash';


/**
 * Container Process List All
 * @param {String} url
 */
export const getContainerList =
    (url) =>
        axios.get(`${url}/containers/json?all=true`)
            .then(resp => {
                const transformObject = v => {
                    const network = get(v, 'NetworkSettings.Networks', {});
                    return {
                        id: get(v,'Id','').substring(0,12),
                        name: get(v, 'Names[0]','').slice(1),
                        state: get(v, 'State', ''),
                        image: get(v, 'Image', ''),
                        status: get(v, 'Status', ''),
                        command: get(v, 'Command', ''),
                        ip: get(network, `[${keys(network)[0]}].IPAddress`, ''),
                        port: get(v, 'Ports', []).map( v => (
                            {
                                private: get(v, 'PrivatePort', ''),
                                public: get(v, 'PublicPort', ''),
                                type: get(v, 'Type', '')
                            }))
                    }
                };
                return resp.data.map(transformObject);
            });

/**
 * Container Inspect Raw Data
 * @param {String} url
 * @param {String} id
 */
export const getContainerInspectRaw = ({url, id}) => axios.get(`${url}/containers/${id}/json`);

/**
 * Container Inspect Process Data
 * @param {String} url
 * @param {String} id
 */
export const getContainerInfo = ({url, id}) =>
     axios.get(`${url}/containers/${id}/json`)
        .then( resp => {
            const { data } = resp;
            const state = get(data, 'State', {});
            const command = get(data, 'Config.Cmd', []);

            return {
                info : {
                    id: get(data, 'Id', ''),
                    name: get(data, 'Name', '').slice(1),
                    status: get(data, 'State.Status',''),
                    state: filter(keys(state), v => v === 'true')[0],
                    pid: get(data, 'State.Pid', ''),
                    startedAt: get(data, 'State.StartedAt', ''),
                    created: get(data, 'Created', ''),
                    image: get(data, 'Config.Image',''),
                },
                detail: {
                    image: get(data, 'Image', ''),
                    command: (!isArray(command) ? [] : command).join(' ') ,
                    env: get(data, 'Config.Env', []),
                    labels: get(data, 'Config.Labels', {}),
                    restartPolicy: get(data, 'HostConfig.RestartPolicy.Name', ''),
                    maxRetryCount: get(data, 'HostConfig.RestartPolicy.MaximumRetryCount',0)
                },
                volume: map(get(data,'Mounts',[]), v => ({
                    type: get(v, 'Type', ''),
                    src: get(v, 'Source', ''),
                    dest: get(v, 'Destination', ''),
                    mode: get(v, 'Mode')
                }))


            }
        });

export const createContainer = ({url, form}) =>
    axios.post(`${url}/containers/create?name=${form.name}`, {
        "Image": form.image,
        "ENV": map(form.env, v => `${v.key}=${v.value}`),
        "Cmd": get(form, 'command',[]),
        "ExposedPorts": form.exposed,
        "HostConfig": {
            "RestartPolicy": {
                "Name": form.restartPolicy
            },
            "PortBindings": form.bindings,
            "PublishAllPorts": form.publishAllPorts,
            "Binds": map(form.volume, v => {
                if ( v.rw == false && v.opt == "volume" ) {
                    return v.name + ":" + v.containerPath + ":ro"
                }
                if ( v.rw == false && v.opt == "bind" ) {
                    return v.hostPath + ":" + v.containerPath + ":ro"
                }
                if ( v.rw == true && v.opt == "volume" ) {
                    return v.name + ":" + v.containerPath
                }
                if (v.rw == true && v.opt == "bind") {
                    return v.hostPath + ":" + v.containerPath
                }
            }, []),
            "NetworkMode": form.networkMode,
            "Privileged": form.privileged,
            "ExtraHosts": get(form, 'extrahosts', []),
            "Devices": map(form.device, v => {
                const value = {};
                value.PathOnHost = v.host;
                value.PathInContainer = v.container;
                value.CgroupPermissions = 'rwm';
                return value;
            },[])
        },
        "NetworkingConfig": {
            "EndpointsConfig":{
                "bridge":{
                    "IPAMConfig":{
                        "IPv4Address": form.ipv4Address,
                        "IPv6Address": form.ipv6Address
                    }
                }
            }
        },
        "Labels": reduce(form.labels, (acc, obj) => {
            acc[obj.name] = obj.value;
            return acc;
        },{}),
        "Entrypoint": form.entryPoint,
        "WorkingDir": form.workingDir,
        "User": form.user,
        "name": form.name,
        "Hostname": form.hostName,
        "Domainname": form.domainName,
        "OpenStdin":false,
        "Tty":false,
        "Volumes":reduce(form.volume, (acc, obj) => {
            acc[obj.containerPath] = {};
            return acc;
        },{}),
        }
    ).catch(err => console.log(err));

export const getContainerLog = ({url, id, query}) => 
	request({
		method: 'GET',
		url: `${url}/containers/${id}/logs?${qs.stringify(query)}`
	})	
	
export const getContainerStat = async ({url, id}) => {
	const { data } = await axios.get(`${url}/containers/${id}/stats?stream=0`);

	const networks = get(data, 'networks', {});
	const device = networks[keys(networks)[0]];

	const calculateCPUPercent = (totalUse, preTotalUse, systemUse, preSystemUse) =>
		(totalUse - preTotalUse) / (systemUse - preSystemUse) * 100;

	const usage = get(data, 'cpu_stats.cpu_usage.total_usage', 0);
	const preUsage = get(data, 'precpu_stats.cpu_usage.total_usage',0);
	const systemUsage = get(data, 'cpu_stats.system_cpu_usage',0);
	const preSystemUsage = get(data, 'precpu_stats.system_cpu_usage',0);

	const timestamp = get(data, 'read', '');
	return {
		memoryUsage: get(data, 'memory_stats.usage', 0),
		cpuUsage: parseFloat(calculateCPUPercent(usage, preUsage, systemUsage, preSystemUsage).toFixed(2)),
		network: {
			rx: get(device, 'rx_bytes', 0),
			tx: get(device, 'tx_bytes', 0)
		},
		time: timestamp.substr(timestamp.indexOf('T') + 1, 8) 
	}
}

export const getProcessInsideContainer = ({url, id}) => axios.get(`${url}/containers/${id}/top`);
export const startContainer = ({url, id}) => axios.post(`${url}/containers/${id}/start`);
export const stopContainer = ({url, id}) => axios.post(`${url}/containers/${id}/stop`);
export const restartContainer = ({url, id}) => axios.post(`${url}/containers/${id}/restart`);
export const killContainer = ({url, id}) => axios.post(`${url}/containers/${id}/kill`);
export const pauseContainer = ({url, id}) => axios.post(`${url}/containers/${id}/pause`);
export const resumeContainer = ({url, id}) => axios.post(`${url}/containers/${id}/unpause`);
export const updateContainer = ({url, id, form}) => axios.post(`${url}/containers/${id}/update`, form);
export const removeContainer = ({url, id}) => axios.delete(`${url}/containers/${id}`);
export const pruneContainer = (url) => axios.post(`${url}/containers/prune`);
