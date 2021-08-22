import React from "react";
import { Link, Route } from "react-router-dom";

export default function App() {
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

	</div>
}

const LiveActivities = () => (
	<h2>Live Activities</h2>
)

const Search = () => (
	<h2>Search</h2>
)