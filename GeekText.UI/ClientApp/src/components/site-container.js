import React from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";

import SearchBar from "./SearchBar";

class SiteContainer extends React.Component {
	render() {
		return (
			<div id="site-container">
				<Container maxWidth="lg" className="home">
					<SearchBar user={this.props.user}/>
					{this.props.children}
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(SiteContainer);