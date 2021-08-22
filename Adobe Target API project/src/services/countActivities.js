const getActivities = require('./getActivities.js');

async function countActivities(filter,caller) {
	//Get list of activities from getActivities
	let act_data = await getActivities.getActivities(filter);

	let activitiesObject = {};
	activitiesObject.total = act_data.total;
	
	//Declare counters, objects and variables
	let expCounter = 0;
	let pznCounter = 0;
	let expCategories = {};
	let pznCategories = {};
	let keyExists;
	let activityNameCategory;

	//Loop through activities
	act_data.activities.forEach(function (activity) {
		let activityName = activity.name;
		let activityNameDetails = activityName.split('|');

		//If | exists in Activity name, trim any spaces
		if (activityNameDetails.length > 1) {
			activityNameCategory = activityNameDetails[1].trim();
		}
		else {
			activityNameCategory = activityNameDetails[0];
		}

		//Count all experiments and categorise dynamically
		if (activityName.startsWith('EXP')) {
			expCounter++;

			//if category already exists, then increment, otherwise, add to object
			keyExists = activityNameCategory in expCategories;
			if (keyExists) {
				expCategories[activityNameCategory]++;
			}
			else {
				expCategories[activityNameCategory] = 1;
			}
		}

		//Count all personalisation and categorise dynamically
		if (activityName.startsWith('PZN')) {
			pznCounter++;

			//if category already exists, then increment, otherwise, add to object
			keyExists = activityNameCategory in pznCategories;
			if (keyExists) {
				pznCategories[activityNameCategory]++;
			}
			else {
				pznCategories[activityNameCategory] = 1;
			}
		}
	})
	if (caller !== undefined) {
		activitiesObject.expCount = expCounter;
		activitiesObject.expCategories = expCategories;
		activitiesObject.pznCount = pznCounter;
		activitiesObject.pznCategories = pznCategories;

		return activitiesObject;
	}
	else {
		// Show total # of activities
		console.log(`Count: ${activitiesObject.total}`)

		// Show totals
		console.log(`# of Experiments: ${expCounter}`);
		console.log(expCategories);
		console.log(`# of Personalisation: ${pznCounter}`);
		console.log(pznCategories);
	}
}

//Get Activities filter from command line
// var argv = require('minimist')(process.argv.slice(2));
// countActivities(argv.filter);

module.exports.countActivities = countActivities;