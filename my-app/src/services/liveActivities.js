const getActivities = require('./getActivities.js');
const getActivityById = require('./getActivityById.js');
const getAudienceById = require('./getAudienceById.js');

async function liveActivities(caller) {
	//Get list of activities from getActivities
	const filter = 'approved';
	const audienceList = [];
	const fromTerminal = caller == undefined ? true : false;
	// let liveActivitiesList = [];
	let activitiesResponse = [];
	let activityLocations = {};
	let audienceLocation;
	let audienceIds;
	let audienceRules;
	let recordID;
	let recordName;
	let recordExperiences;
	let recordLocations;
	let recordPriority;

	let numberOfActivities = 0;

	// Get a list of live activities
	const activitiesList = await getActivities.getActivities(filter);
	numberOfActivities = activitiesList.total;

	if (fromTerminal) {
		console.log(`Getting a list of live activities`);
	}
	console.log(`activities List ${activitiesList.total}`);
	// For each activity
	for (let [index,activity] of activitiesList.activities.entries()) {		
		try {
			// Get activity details
			let activityRecord = await getActivityById.getActivityById(activity.id,activity.type);
			console.log(`index ${index}`);
			console.log(`activityRecord.id ${activityRecord.id}`);
			recordID = activityRecord.id;
			recordName = activityRecord.name;
			recordExperiences = activityRecord.experiences;
			recordPriority = activityRecord.priority;
			recordModifiedDate = activityRecord.modifiedAt;
			recordLocations = [];

			activityLocations = activityRecord.locations.selectors;

			// For each location (audience)
			for (let location of activityLocations) {
				audienceIds = location.audienceIds;
				for (let audienceId of audienceIds) {
					// Check if location details have already been retrieved
					if (audienceList.indexOf(audienceId) === -1) {
						audienceList.push(audienceId);
						
						// Only get details if they haven't
						audienceLocation = await getAudienceById.getAudienceById(audienceId);
						if (audienceLocation.targetRule !== undefined) {
							audienceRules = audienceLocation.targetRule[Object.keys(audienceLocation.targetRule)[0]];
							console.log(`audienceId ${audienceId}`);
							
							// Get domain and page of location
							for (let domainRule of audienceRules) {
								if (domainRule.equals !== undefined) {
									if (domainRule.page == 'domain' && domainRule.equals == 'www.racv.com.au') {
										if (audienceRules[Object.keys(audienceRules)[1]] !== undefined) {
											let pageRule = audienceRules[Object.keys(audienceRules)[1]];
											console.log(`page is ${pageRule.equals[0]}`);

											// Assign location details to Activities object to pass in Response
											// console.log(`current Activity is ${liveActivitiesList[index]}`);
											recordLocations.push({page : pageRule.equals[0]});
										}
									} 
								}
							}
						}
					}
				}
			}

			activitiesResponse.push({id : recordID, name : recordName, priority : recordPriority, modifiedDate : recordModifiedDate, experiences : recordExperiences, locations : recordLocations});
		}
		catch(err) {
			console.log(`Error in retrieving Live Activities ${err}`);
		}
	}
	// console.log(`live activities ${liveActivitiesList}`);
	// console.log(`audiences ${liveActivitiesList.locations}`);
	// return liveActivitiesList;
	return activitiesResponse;
}

// var argv = require('minimist')(process.argv.slice(2));
// liveActivities();

module.exports.liveActivities = liveActivities;