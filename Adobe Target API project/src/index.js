import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Filter from './filter';
import Search from './search';
import LiveActivities from './live';
import './index.css';
import './table-sort.js';

const App = () => (
	<div>
		<nav>
			<ul>
				<li>
					<Link to="/">Activities count</Link>
				</li>
				<li>
					<Link to="/search">Search within Activities</Link>
				</li>
				<li>
					<Link to="/live">Live Activities</Link>
				</li>
			</ul>
		</nav>

		<Route path="/live">
			<LiveActivities />
		</Route>
		<Route path="/search">
			<Search />
		</Route>
		<Route path="/" exact>
			<Filter />
		</Route>
	</div>
)
  
// ========================================
  
ReactDOM.render((
	<Router>
		<App />
	</Router>),
	document.getElementById('root')
);