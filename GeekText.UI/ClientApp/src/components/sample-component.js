import React from 'react';
import Button from "@material-ui/core/Button";

import logo from '../logo.svg';
import '../App.css';

class SampleComponent extends React.Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/components/sample-component.js</code> and save to reload.
					</p>
					<Button variant="contained" color="primary" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
						Learn React
					</Button>
				</header>
			</div>
		);
	}
}

export default SampleComponent;