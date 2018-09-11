import axios from 'axios';
import { get } from 'lodash';

export const getSelectRegistryImage = (url) =>
    axios.get(`${url}/v2/_catalog`)
        .then(resp => {
            const { data }  = resp;
            return  {
                image: get(data,'repositories','')
            }
        });
