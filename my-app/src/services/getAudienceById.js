const getAccessCode = require('./getAccessCode.js');
const axios = require('axios');

const adobeio_domain = 'https://mc.adobe.io/racv/target';
const audiences_endpoint = '/audiences';

async function getAudienceById(id) {
	const access_token = await getAccessCode.getAccessToken;
	
	let act_endpoint = adobeio_domain+audiences_endpoint;
	if (id !== undefined) {
		act_endpoint = `${act_endpoint}/${id}`;
		// console.log(`act_endpoint ${act_endpoint}`);
		const act_config = {
			method: 'get',
			url: act_endpoint,
			headers: {
				'authorization': `Bearer ${access_token}`,
				'x-api-key': 'bad1cc06ef0349ac978805b6bc8fc341',
				'accept': 'application/vnd.adobe.target.v3+json',
				'cache-control': 'no-cache'
			}
		}
	
		const activity = await axios(act_config);
	
		let act_data = activity.data;
		// console.log(`act_data ${act_data}`);
		return act_data;
	}
	else {
		console.log(`No Location ID specified`);
	}
}
//Get Activity ID from command line
// var argv = require('minimist')(process.argv.slice(2));

module.exports.getAudienceById = getAudienceById;