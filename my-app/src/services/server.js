const express = require('express');
const app = express();
const findInActivities = require('./findInActivities.js');
const countActivities = require('./countActivities.js');
const liveActivities = require('./liveActivities.js');

app.set('port', '3080');
app.use('/api/countactivities', (req, res) => {
	let filter = req.headers.filter;
	let caller = req.headers.caller;
	console.log(`${caller} counting all ${filter} activities`);
	countActivities.countActivities(filter,caller)
		.then (function(response) {
			act_data = response;
			res.json(act_data);
		})
});
app.use('/api/searchactivities', (req, res) => {
	let filter = req.headers.filter;
	let query = req.headers.query;
	let caller = req.headers.caller;
	console.log(`${caller} search for ${query} within all ${filter} activities`);
	findInActivities.findInActivities(query,filter,caller)
		.then (function(response) {
			act_data = response;
			res.json(act_data);
		})
});
app.use('/api/liveactivities', (req, res) => {
	let caller = req.headers.caller;
	console.log(`react is requesting all live activities`);
	liveActivities.liveActivities(caller)
		.then (function(response) {
			act_data = response;
			res.json(act_data);
		})
});
app.listen(app.get('port'));