import React from "react";
import { Grid } from "@material-ui/core";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CartBar from "./ShoppingCart/CartBar";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CartList from "./ShoppingCart/cartList";
import { connect } from 'react-redux'

export class SearchBar extends React.Component {
    
    renderSearchBarWithCartAmount() {
        const { authenticated } = this.props;

        console.log(this.props.authenticated);
        let account_buttons = this.props.authenticated ? (
      <Grid item>
        <FavoriteIcon htmlColor="#ec407a" fontSize="large" />
      </Grid>
      ) : null;

        let account_path = this.props.authenticated ? "profile" : "login";

    if (this.props.itemsCartTotal === 0) {
      return (
        <>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item md={2}>
              <h2>GeekText</h2>
            </Grid>
            <Grid item md={8}>
              {/* TEMP SEARCH BAR  */}
              <div className="searchBar">
                <input
                  type="text"
                  className="search"
                  placeholder="Search for a book"
                />
                <button className="searchButton">
                  <FaSearch />
                </button>
              </div>
            </Grid>
            <Grid item>
              <a href={"/" + account_path}>
                <AccountCircleIcon color="primary" fontSize="large" />
              </a>
            </Grid>
            <Grid item>
              <CartBar />
            </Grid>
            {account_buttons}
          </Grid>
        </>
      );
    }

    return (
      <>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={2}>
            <h2>GeekText</h2>
          </Grid>
          <Grid item md={8}>
            {/* TEMP SEARCH BAR  */}
            <div className="searchBar">
              <input
                type="text"
                className="search"
                placeholder="Search for a book"
              />
              <button className="searchButton">
                <FaSearch />
              </button>
            </div>
          </Grid>
          <Grid item>
            <a href={"/" + account_path}>
              <AccountCircleIcon color="primary" fontSize="large" />
            </a>
          </Grid>
          <Grid item>
            <CartBar itemsTotal={this.props.itemsCartTotal}></CartBar>
          </Grid>
          {account_buttons}
        </Grid>
      </>
    );
  }

  render() {
    return this.renderSearchBarWithCartAmount();
  }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated
    };
}

export default connect(mapStateToProps)(SearchBar);

