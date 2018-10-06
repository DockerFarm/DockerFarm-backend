import axios from 'axios';
import { get } from 'lodash';
import { humanSize } from 'lib/utility';

export const getEndpointInfo = (url) =>
    axios.get(`${url}/info`)
        .then( resp => {
            const { data } = resp;

            return {
                info: {
                    name: get(data, 'Name', '' ),
                    cpu: get(data, 'NCPU', ''),
                    memory: humanSize(get(data, 'MemTotal', '')),
                    dockerversion: get(data, 'ServerVersion', ''),
                },
                container: {
                    total: get(data, 'Containers', ''),
                    running: get(data, 'ContainersRunning', ''),
                    stop: get(data, 'ContainersStopped', '' )
                },
                os:  get(data, 'OperatingSystem', ''),
                status: {
                    cpu: get(data, 'NCPU', ''),
                    memory: humanSize(get(data, 'MemTotal', '')),
                    rootdir: get(data, 'DockerRootDir', ''),
                    storage: get(data, 'Driver', ''),
                    logging: get(data, 'LoggingDriver', ''),
                    cgroup: get(data, 'CgroupDriver', '')
                },
                plugins: {
                    volume: get(data, 'Plugins.Volume', ''),
                    network: get(data, 'Plugins.Network', ''),
				},
				swarm: {
					nodeId: get(data, 'Swarm.NodeID',''),
					nodeAddr: get(data, 'Swarm.NodeAddr',''),
					localNodeState: get(data, 'Swarm.LocalNodeState', ''),
					remoteManagers: get(data, 'Swarm.RemoteManagers', []),
					nodeCnt: get(data, 'Swarm.Nodes',0),
					managerCnt: get(data, 'Swarm.Managers',0)
				}
            }
        });

export const getEngineVersion = (url) =>
    axios.get(`${url}/version`)
        .then( resp => {
            const { data } = resp;

            return {
                docker: get(data, 'Version', ''),
                api: get(data, 'ApiVersion', ''),
                go: get(data, 'GoVersion', ''),
                kernel: get(data, 'KernelVersion', ''),
                ostype: get(data, 'Os', ''),
                arch: get(data, 'Arch', ''),
            }
        });
