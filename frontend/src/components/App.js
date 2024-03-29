import { Route, Switch } from 'react-router-dom'

import HomePage from './containers/HomePage'
import MissionsContainer from './containers/MissionsContainer'
import SoldiersContainer from './containers/SoldiersContainer'
import NotFoundPage from './NotFoundPage'
import PropTypes from 'prop-types'
import React from 'react'
import { hot } from 'react-hot-loader'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<h1>Super Soldiers</h1>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/missions" component={MissionsContainer} />
					<Route path="/soldiers" component={SoldiersContainer} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		)
	}
}

App.propTypes = {
	children: PropTypes.element
}

export default hot(module)(App)
