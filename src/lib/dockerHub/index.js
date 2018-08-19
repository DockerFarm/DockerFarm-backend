import axios from 'axios';
import { get, map } from 'lodash';
import { numberWithCommas } from 'lib/utility';

export const getRepoList = (size, page_size) =>
    axios.get(`https://hub.docker.com/v2/repositories/library/?page=${size}&page_size=${page_size}`)
    .then(resp => {
        const transformObject = v => {
            return {
                name: get(v, 'name', ''),
                description: get(v, 'description', ''),
                repositorytype: get(v, 'repository_type', ''),
                startCount: numberWithCommas(get(v, 'star_count', 0)),
                pullCount: numberWithCommas(get(v, 'pull_count', 0)),
                logo: `https://github.com/docker-library/docs/raw/master/${v.name}/logo.png`
            }
        };
        return resp.data.results.map(transformObject);
    });
