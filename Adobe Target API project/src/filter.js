import React from 'react';
const axios = require('axios');

export default class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: {}
		}
	}
	
	handleFilterChange = () => {		
		//Get list of activities from getActivities
		let filter = document.getElementById('activity-status').value;
		const act_config = {
			method: 'get',
			url: '/api/countactivities',
			headers: {
				'filter': filter,
				'caller': 'react'
			}
		};
		
		const countActivities = axios(act_config);
		countActivities.then (res => {
			this.setState(prevState => ({activities: res.data}));
		})
	}

	componentDidMount = () => {
		this.handleFilterChange();
	}
	
	render() {
		return (
			<div className="">
				<div className="">
					<h1>Show activities details</h1>
					<label htmlFor="activity-status">Type of activity</label>
					<select id="activity-status" onChange={this.handleFilterChange} defaultValue="approved">
						<option value="">All</option>
						<option value="approved">Live</option>
						<option value="saved">Inactive</option>
						<option value="deactivated">Deactivated</option>
					</select>
					<ActivityGroups activities={this.state.activities} />
				</div>
			</div>
		);
	}
}

class ActivityGroups extends React.Component {
	constructor(props) {
		super(props);
		this.renderActivities = this.renderActivities.bind(this);
	}

	renderActivities(activities) {
		const activitiesList = [];
		
		for (let name in activities) {
			let activityName = name;
			let activityCount = activities[name];
			activitiesList.push(<tr key={name}><td>{activityName}</td><td>{activityCount}</td></tr>);
		}
		return activitiesList;
	}

	render() {
		const p = this.props;
		return (
			<div>
				<h2>
					Total activities <span>{p.activities.total}</span>
				</h2>
				<table>
					<thead>
						<tr className='totals'>
							<th>Total experiments</th><td>{p.activities.expCount}</td>
						</tr>
					</thead>
					<tbody>
					{this.renderActivities(p.activities.expCategories)}
					</tbody>
				</table>
				<table>
					<thead>
						<tr className='totals'>
							<th>Total personalisations</th><td>{p.activities.pznCount}</td>
						</tr>
					</thead>
					<tbody>
					{this.renderActivities(p.activities.pznCategories)}
					</tbody>
				</table>
			</div>
		)
	}
}