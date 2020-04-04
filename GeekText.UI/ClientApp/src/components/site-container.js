import React from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import CartBar from "./ShoppingCart/CartBar";
import SearchBar from "./SearchBar";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const cartStyle = {
  position: "absolute",
  top: "10px"
};

window.updateTopMostParent = itemTotal => {
  // Update state of topmost parent when this method is called
  this.setState({ itemTotal });
};

class SiteContainer extends React.Component {
  state = {
    itemTotal: window.$cartTotal
  };

  render() {
    return (
      <div id="site-container">
        <Container maxWidth="lg" className="home">
          <div>
            <SearchBar
              user={this.props.user}
              itemTotal={this.state.itemTotal}
            />
          </div>

          {this.props.children}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(SiteContainer);
