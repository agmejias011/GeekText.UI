import React from "react";
import { Container } from "@material-ui/core";

import SearchBar from "./SearchBar";

class SiteContainer extends React.Component {
	render() {
		return (
			<div id="site-container">
				<Container maxWidth="lg" className="home">
					<SearchBar />
					{this.props.children}
				</Container>
			</div>
		);
	}
}

export default SiteContainer;