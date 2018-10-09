import axios from 'axios';
import { get, assign, sumBy } from 'lodash';
import { humanSize } from 'lib/utility';

export const selectAllRegistryImage = async ({
	isAuth,
	url,
	username,
	password
}) => {
	try {
		let config = null;

		if(isAuth){
			config = {
				auth: { username, password }
			};
		}	
		
		const { data } = await axios.get(`${url}/v2/_catalog`, config);

		const repositories = get(data, 'repositories', []);	
		

		const promises = repositories.map(v => {
			return new Promise(async(resolve,reject) => {
				try {
					const tagResponse = await axios.get(`${url}/v2/${v}/tags/list`, config);
					const manifestResponse = await axios.get(`${url}/v2/${v}/manifests/latest`, assign({}, config, {
						headers: {
							accept: 'application/vnd.docker.distribution.manifest.v2+json'
						}
					}));

					const tags = tagResponse.data.tags;
					const manifest = manifestResponse.data;
					
					resolve({
						name: v,
						tags,
						size: humanSize(sumBy(get(manifest, 'layers', []), 'size'))
					})
				} catch (e) {
					/* handle error */
					//if error digest delete continue to next 
					resolve();
				}
			})
		});

		return Promise.all(promises);
	} catch (e) {
		throw e;
	}
}
