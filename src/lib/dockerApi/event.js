import axios from 'axios';
import * as utility from 'lib/utility';
import { split, get } from 'lodash'

export const getEvents = (url, sinceTime, untilTime) => axios.get(`${url}/events?since=${sinceTime}&until=${untilTime}`)
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
                created: utility.getDateFromTimeStamp(get(data, 'time', ''))
            }
        }
        return events.map(transformObject);
});
