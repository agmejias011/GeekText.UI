import React from "react";
import { Grid } from "@material-ui/core";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class SearchBar extends React.Component {
  render() {
    let account_buttons = (this.props.user)
      ? (
        <Grid item>
          <FavoriteIcon htmlColor="#ec407a" fontSize="large"/>
        </Grid>
      )
      : null;
    let account_path    = (this.props.user) ? "account" : "login";
    return (
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
          <a href={"/" + account_path}><AccountCircleIcon color="primary" fontSize="large"/></a>
        </Grid>
        <Grid item>
          <ShoppingCartIcon htmlColor="#42a5f5" fontSize="large"/>
        </Grid>
        {account_buttons}
      </Grid>
    );
  }
}
