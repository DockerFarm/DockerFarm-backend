import http from 'request';

export const request = ({method, url}) => 
	new Promise((resolve, reject) => {
		const req = http({
			method,
			uri: url
		});

		let result = '';

		req.on('data', data => {
			result += data;
		});

		req.on('end', _ => {
			resolve(result);
		});
	})
