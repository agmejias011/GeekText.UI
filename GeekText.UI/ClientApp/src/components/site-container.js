import React from "react";
import MainLayout from "./MainLayout";

class SiteContainer extends React.Component {
	render() {
		return (
			<div id="site-container">
				<MainLayout />
				{this.props.children}
			</div>
		);
	}
}

export default SiteContainer;