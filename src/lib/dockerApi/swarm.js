import axios from 'axios';
import { get } from 'lodash';

export const swarmInit = ({url, form}) =>
    axios.post(`${url}/swarm/init`, {
        "ListenAddr": form.listenAddr,
        "AdvertiseAddr": form.advertiseAddr,
        "ForceNewCluster": false,
        "Spec": {
	          "Orchestration": { },
              "Raft": { },
              "Dispatcher": { },
              "CAConfig": { },
              "EncryptionConfig": {
                  "AutoLockManagers": false
              }
	   }
   }).catch(err => console.log(err));

export const getSwarmToken = (url) =>
    axios.get(`${url}/swarm`)
      .then( resp => {
          const { data } = resp;
          return {
                    workerToken: get(data, 'JoinTokens.Worker', ''),
                    managerToken: get(data, 'JoinTokens.Manager', ''),
                }
          });

export const swarmJoin = ({url, form}) =>
    axios.post(`${url}/swarm/join`, {
        "ListenAddr": form.listenAddr,
        "AdvertiseAddr": form.advertiseAddr,
        "RemoteAddrs": [form.remoteAddr],
        "JoinToken": form.token
	   }).catch(err => console.log(err));

export const getSwarmInspectRaw = (url) => axios.get(`${url}/swarm`);

export const swarmLeave = (url) => axios.post(`${url}/swarm/leave?force=true`);
