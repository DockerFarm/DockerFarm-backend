import axios from 'axios';
import qs from 'query-string'
import { request } from 'lib/httpClient';
import { get } from 'lodash';

export const getTaskList = ({url, id}) =>
    axios.get(`${url}/tasks?filters={"service":["${id}"]}`)
        .then(resp => {
            const transformObject = v => {
                return {
                    id: get(v,'ID',''),
                    status: get(v, 'Status.State',''),
                    slot: get(v, 'Slot',''),
                    updatedat: get(v, 'UpdatedAt', ''),
                    nodeId: get(v, 'NodeID', '')
                }
            };
            return resp.data.map(transformObject);
        });

export const getTaskInfo = ({url, id}) =>
    axios.get(`${url}/tasks/${id}`)
        .then(resp => {
            const { data }  = resp;
            return  {
                    id: get(data,'ID',''),
                    state: get(data, 'Status.State',''),
                    stateMessage: get(data, 'Status.Message',''),
                    image: get(data, 'Spec.ContainerSpec.Image', ''),
                    slot: get(data, 'Slot', ''),
                    createdat: get(data, 'CreatedAt', ''),
                    container: get(data, 'Status.ContainerStatus.ContainerID', ''),
            }
        });

export const getTaskLog = ({url, id, query}) =>
	request({
		method: 'GET',
		url: `${url}/tasks/${id}/logs?${qs.stringify(query)}`
	})
