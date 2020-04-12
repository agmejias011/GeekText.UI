import React from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import CartBar from "./ShoppingCart/CartBar";
import SearchBar from "./SearchBar";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ReactDOM from "react-dom";

const cartStyle = {
  position: "absolute",
  top: "10px",
};

class SiteContainer extends React.Component {
  render() {
    return (
      <div id="site-container">
        <Container maxWidth="lg" className="home">
          <div>
            <SearchBar
              user={this.props.user}
              cartItemsTotal={this.props.cartItemsTotal}
            />
          </div>

          {this.props.children}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(SiteContainer);
