const getActivities = require('./getActivities.js');
const getActivityById = require('./getActivityById.js');

async function findInActivities(queryString,filter,caller) {
	//Get list of activities from getActivities
	const activitiesList = await getActivities.getActivities(filter);
	const activities = activitiesList.activities;
	let numberOfActivities = 0;
	let filterType = '';
	const fromTerminal = caller == undefined ? true : false;
	const queriedActivities = {results:{}};

	if (filter !== undefined) {
		filterType = `${filter} `;
	}
	
	if (fromTerminal) {
		console.log(`Looking for "${queryString}" in all ${filterType}activities`);
	}
	for (let activity of activities) {
		let activityRecord = await getActivityById.getActivityById(activity.id,activity.type);
		let activityOptions = JSON.stringify(activityRecord.options);
		if (activityOptions.search(queryString.trim()) !== -1) {
			if (fromTerminal) {
				console.log(`Found in ${activityRecord.name} (${activityRecord.id})`);
			}
			else {
				queriedActivities.results[activityRecord.name] = activityRecord.id;
			}
			numberOfActivities++;
		}
	};
	if (numberOfActivities == 1) {
		if (fromTerminal) {
			console.log(`String found in ${numberOfActivities} activity`);
		}
	}
	else {
		if (fromTerminal) {
			console.log(`String found in ${numberOfActivities} activities`);
		}
	}
	if (!fromTerminal) {
		queriedActivities.numberOfActivities = numberOfActivities;
		return queriedActivities;
	}
}

//Get Activity ID from command line
// var argv = require('minimist')(process.argv.slice(2));
// findInActivities(argv.query,argv.filter);

module.exports.findInActivities = findInActivities;