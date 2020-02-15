import React from "react";

class SiteContainer extends React.Component {
	render() {
		return (
			<div id="site-container">
				{this.props.children}
			</div>
		);
	}
}

export default SiteContainer;