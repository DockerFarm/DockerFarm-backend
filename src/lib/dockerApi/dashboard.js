import axios from 'axios';
import { get, keys, values, map, size, sum } from 'lodash';
import * as utility from 'lib/utility/utility';

export const getEndpointInfo = (url) =>
    axios.get(`${url}/info`)
        .then( resp => {
            const { data } = resp;

            return {
                nodename: get(data, 'Name', '' ),
                nodecpu: get(data, 'NCPU', ''),
                nodememoy: utility.humanSize(get(data, 'MemTotal', '')),
                dockerversion: get(data, 'ServerVersion', ''),
                containers: get(data, 'Containers', ''),
                runningcontainer: get(data, 'ContainersRunning', ''),
                stoppedcontainer: get(data, 'ContainersStopped', '' )
            }
        });

export const imageCount = (url) =>
      axios.get(`${url}/images/json?all=0`)
          .then( resp => {
              const { data } = resp;
              const totalSize  = data.map( v => v.Size);
              return {
                  image: size(data),
                  totalsize: utility.humanSize(sum(values(totalSize)))
              }
          })

export const volumeCount = (url) =>
    axios.get(`${url}/volumes`)
        .then( resp => {
            const { data } = resp;
            return {
              volume: size(data.Volumes)
            }
          })

export const networkCount = (url) =>
    axios.get(`${url}/networks`)
        .then( resp => {
            const { data } = resp;
            return {
                network: size(data)
            }
        })
