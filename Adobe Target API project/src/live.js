import React from 'react';
const axios = require('axios');

class ActivityDetails extends React.Component {
	constructor(props) {
		super(props);
		this.showActivities = this.showActivities.bind(this);
		this.getElements = this.getElements.bind(this);
		this.sortHTML = this.sortHTML.bind(this);
	}

	showActivities(activities) {
		const tableOfActivities = [];
		// console.log(`activities ${activities}`);
		
		let activityId;
		let activityName;
		let activityPriority;
		let activityModifiedDate;
		let activityUTCModifiedDate;
		let activityLocations;

		if (activities !== undefined) {
			const activityList = activities;
			activityList.forEach((record,index) => {
				activityId = record.id;
				activityName = record.name;
				activityPriority = record.priority;
				activityLocations = Object.keys(record.locations).map(function(k) { if (record.locations[k].page === '/') {return 'homepage'} else {return record.locations[k].page.substr(1).slice(0, -1).replace('.html','')} }).join('\n');
	
				if (record.modifiedDate !== undefined) {
					activityUTCModifiedDate = new Date(record.modifiedDate).toString();
					activityModifiedDate = activityUTCModifiedDate.split(' GMT')[0];
					// console.log(activityModifiedDate);
					tableOfActivities.push(<tr key={activityId} className="activity"><td>{index+1}</td><td>{activityId}</td><td>{activityName}</td><td>{activityModifiedDate}</td><td>{activityPriority}</td><td>{activityLocations}</td></tr>);
				}
				else {
					tableOfActivities.push(<tr key={activityId} className="activity"><td>{index+1}</td><td>{activityId}</td><td>{activityName}</td><td></td><td>{activityPriority}</td><td>{activityLocations}</td></tr>);
				}
			})
			return tableOfActivities;
		}
	}

	getElements = function (id) {
		if (typeof id == "object") {
		  return [id];
		} else {
		  return document.querySelectorAll(id);
		}
	};
	
	sortHTML = function(id, sel, sortvalue) {
		var a, b, i, ii, y, bytt, v1, v2, cc, j;
		a = this.getElements(id);
		for (i = 0; i < a.length; i++) {
		  for (j = 0; j < 2; j++) {
			cc = 0;
			y = 1;
			while (y === 1) {
			  y = 0;
			  b = a[i].querySelectorAll(sel);
			  for (ii = 0; ii < (b.length - 1); ii++) {
				bytt = 0;
				if (sortvalue) {
				  v1 = b[ii].querySelector(sortvalue).innerText;
				  v2 = b[ii + 1].querySelector(sortvalue).innerText;
				} else {
				  v1 = b[ii].innerText;
				  v2 = b[ii + 1].innerText;
				}
				v1 = v1.toLowerCase();
				v2 = v2.toLowerCase();
				if ((j === 0 && (v1 > v2)) || (j === 1 && (v1 < v2))) {
				  bytt = 1;
				  break;
				}
			  }
			  if (bytt === 1) {
				b[ii].parentNode.insertBefore(b[ii + 1], b[ii]);
				y = 1;
				cc++;
			  }
			}
			if (cc > 0) {break;}
		  }
		}
	};

	render() {
		const p = this.props;
		return (
			<div>
				<h2>Total number of Live activities: {p.activities.total}</h2>
				<table id="live-activities">
					<thead>
						<tr>
							<th onClick={this.sortHTML('#live-activities','.activity', 'td:nth-child(1)')} className="table-header"></th>
							<th onClick={this.sortHTML('#live-activities','.activity', 'td:nth-child(2)')} className="table-header">Activity ID</th>
							<th onClick={this.sortHTML('#live-activities','.activity', 'td:nth-child(3)')} className="table-header">Activity Name</th>
							<th onClick={this.sortHTML('#live-activities','.activity', 'td:nth-child(4)')} className="table-header">Last Modified</th>
							<th onClick={this.sortHTML('#live-activities','.activity', 'td:nth-child(5)')} className="table-header">Priority Score</th>
							<th onClick={this.sortHTML('#live-activities','.activity', 'td:nth-child(6)')} className="table-header">Location</th>
						</tr>
					</thead>
					<tbody>
					{this.showActivities(p.activities)}
					</tbody>
				</table>
			</div>
		)
	}
}

export default class LiveActivities extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: {}
		}
	}
	
	getAllActivities = () => {		
		//Get list of activities from getActivities
		const act_config = {
			method: 'get',
			url: '/api/liveactivities',
			headers: {
				'caller': 'react'
			}
		};
		
		const getActivities = axios(act_config);

		getActivities.then (res => {
			this.setState(prevState => ({activities: res.data}));
		})
	}

	componentDidMount = () => {
		this.getAllActivities();
	}

	render() {
		if (Object.keys(this.state.activities).length > 0) {
			return (
				<div>
					<h1>Live Activities</h1>
					<ActivityDetails activities={this.state.activities} />
				</div>
			)
		}
		return (
			<div>
				<h1>Loading Live Activities...</h1>
			</div>
		)
	}
}