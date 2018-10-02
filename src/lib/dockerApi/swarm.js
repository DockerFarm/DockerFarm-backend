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
