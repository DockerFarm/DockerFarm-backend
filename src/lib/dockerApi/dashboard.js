import axios from 'axios';
import { get } from 'lodash';
import { humanSize } from 'lib/utility';

export const getEndpointInfo = (url) =>
    axios.get(`${url}/info`)
        .then( resp => {
            const { data } = resp;

            return {
                nodename: get(data, 'Name', '' ),
                nodecpu: get(data, 'NCPU', ''),
                nodememoy: humanSize(get(data, 'MemTotal', '')),
                dockerversion: get(data, 'ServerVersion', ''),
                containers: get(data, 'Containers', ''),
                runningcontainer: get(data, 'ContainersRunning', ''),
                stoppedcontainer: get(data, 'ContainersStopped', '' )
            }
        });