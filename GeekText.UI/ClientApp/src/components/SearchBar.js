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

export default class SearchBar extends React.Component {
  render() {
    const StyledBadge = withStyles(theme => ({
      badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px"
      }
    }))(Badge);
    let account_buttons = this.props.user ? (
      <Grid item>
        <FavoriteIcon htmlColor="#ec407a" fontSize="large" />
      </Grid>
    ) : null;
    let account_path = this.props.user ? "account" : "login";
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
          <a href={"/" + account_path}>
            <AccountCircleIcon color="primary" fontSize="large" />
          </a>
        </Grid>
        <Grid item>
          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge
                badgeContent={this.props.itemsTotal}
                color="secondary"
                style={{ color: "#42a5f5" }}
              >
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </Grid>
        {account_buttons}
      </Grid>
    );
  }
}
