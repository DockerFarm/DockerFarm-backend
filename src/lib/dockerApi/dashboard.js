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
                }
            }
        });
