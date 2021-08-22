const getAccessCode = require('./getAccessCode.js');
const axios = require('axios');

const adobeio_domain = 'https://mc.adobe.io/racv/target';
const activities_endpoint = '/activities';

async function getActivities(filter) {
	const access_token = await getAccessCode.getAccessToken;
	
	let act_endpoint = adobeio_domain+activities_endpoint;
	if (filter !== undefined) {
		act_endpoint = `${act_endpoint}?state=${filter}`;
	}

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

	const activities = await axios(act_config);

	let activitiesList = activities.data;
	return activitiesList;
}

module.exports.getActivities = getActivities;