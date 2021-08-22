import React from 'react';
const axios = require('axios');

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.showSearchResults = this.showSearchResults.bind(this);
	}

	showSearchResults(activities) {
		const activitiesList = [];
		
		for (let name in activities) {
			let activityName = name;
			let activityId = activities[name];
			activitiesList.push(<tr key={activityId}><td>{activityName}</td><td>{activityId}</td></tr>);
		}
		console.log(activitiesList);
		return activitiesList;
	}

	render() {
		const p = this.props;

		if (p.query.length > 0) {
			return (
				<div>
					<h2>
						Searching for "{p.query}" in all {p.filter}activities
					</h2>
					<table>
						<tbody>
						<tr>
							<td>Number of activities</td><td>{p.activities.numberOfActivities}</td>
						</tr>						
						{this.showSearchResults(p.activities.results)}
						</tbody>
					</table>
				</div>
			)
		}
		else {
			return null;
		}
	}
}

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: {},
			query: '',
			filter: ''
		}
	}

	handleSearchClick = (e) => {
		e.preventDefault();
		//Get list of activities from getActivities
		let filter = document.getElementById('search-activity-status').value;
		let query = document.getElementById('search-query').value.toLowerCase();
		
		if (query.length > 0) {
			const act_config = {
				method: 'get',
				url: '/api/searchactivities',
				headers: {
					'filter': filter,
					'query': query,
					'caller': 'react'
				}
			};
	
			this.setState({
				query: query,
				filter: filter + ' '
			});
	
			const findInActivities = axios(act_config);
			findInActivities.then (res => {
				this.setState({activities: res.data});
			})
		}
		else {
			this.setState({activities: {'Required': 'Please input a search criteria'}});
		}
	}
	
	render() {
		return (
			<div>
				<h1>Search</h1>
				<label htmlFor="search-activity-status">Type of activity</label>
				<select id="search-activity-status" defaultValue="approved">
					<option value="">All</option>
					<option value="approved">Live</option>
					<option value="saved">Inactive</option>
					<option value="deactivated">Deactivated</option>
				</select>
				<label htmlFor="search-query">Search within activities: </label><input type="text" id="search-query" placeholder="Search..." required aria-required></input>
				<button id="search-button" onClick={this.handleSearchClick}>Search</button>
				<SearchResults activities={this.state.activities} query={this.state.query} filter={this.state.filter}/>
			</div>
		)
	}
}