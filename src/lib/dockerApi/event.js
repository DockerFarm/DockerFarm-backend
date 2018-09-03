import axios from 'axios';
import { objectToQueryString, getDateFromTimeStamp } from 'lib/utility';
import { split, get } from 'lodash'

export const getEvents = (url, params) => axios.get(`${url}/events?${objectToQueryString(params)}
`)
    .then(resp => {
        const events  = resp.data.split("\n");
        events.pop();
        const transformObject = v => {
            const data = JSON.parse(v);
            return {
                type: get(data, 'Type', ''),
                id: get(data, 'Actor.ID', '').substring(0,12),
                name: get(data, 'Actor.Attributes.name', ''),
                action: get(data, 'Action', ''),
                created: getDateFromTimeStamp(get(data, 'time', ''))
            }
        }
        return events.map(transformObject);
});
