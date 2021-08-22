import React from 'react';
import { useTable, useSortBy } from 'react-table'
const axios = require('axios');

function Table({columns, data}) {
	const {
		rows,
		getTableProps,
		getTableBodyProps,
		prepareRow,
		headerGroups,
	} = useTable(
		{
			columns,
			data,
		},
		useSortBy
	)
	const initRow = rows.slice(0, 20)
	const data = React.useMemo(() => [],[])
	const columns = React.useMemo(
		() => [
			{
				Header: '',
				accessor: 'index',
			},
			{
				Header: 'Activity ID',
				accessor: 'id',
			},
			{
				Header: 'Activity Name',
				accessor: 'name',
			},
			{
				Header: 'Last Modified',
				accessor: 'modified',
			},
			{
				Header: 'Priority Score',
				accessor: 'priority',
			},
			{
				Header: 'Location',
				accessor: 'location',
			},
		],
		[]
	)

	return (
		<div>
			<h2>Total number of Live activities: {p.activities.total}</h2>
			<table {...getTableProps()}>
				<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map(column => (
						<th {...column.getHeaderProps()}>
							{column.render('Header')}
						</th>
					))}
					</tr>
				))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map(row => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
									return (
										<td {...cell.getCellProps()}>
											{cell.render('Cell')}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>  
	)
}

class ActivityDetails extends React.Component {
	constructor(props) {
		super(props);
		this.showActivities = this.showActivities.bind(this);
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
					tableOfActivities.push(<tr key={activityId}><td>{index+1}</td><td>{activityId}</td><td>{activityName}</td><td>{activityModifiedDate}</td><td>{activityPriority}</td><td>{activityLocations}</td></tr>);
				}
				else {
					tableOfActivities.push(<tr key={activityId}><td>{index+1}</td><td>{activityId}</td><td>{activityName}</td><td></td><td>{activityPriority}</td><td>{activityLocations}</td></tr>);
				}
			})
			return tableOfActivities;
		}
	}

	render() {
		const p = this.props;
		return (
			<div>
				<h2>Total number of Live activities: {p.activities.total}</h2>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Activity ID</th>
							<th>Activity Name</th>
							<th>Last Modified</th>
							<th>Priority Score</th>
							<th>Location</th>
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