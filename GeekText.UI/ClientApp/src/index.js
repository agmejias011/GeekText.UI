import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SiteContainer from "./components/site-container";
import SampleComponent from "./components/sample-component";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
	<Router>
		<SiteContainer>
			<Switch>
				<Route path="/">
					<SampleComponent/>
				</Route>
				<Route path="/example-route">
					<SampleComponent/>
				</Route>
			</Switch>
		</SiteContainer>
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
