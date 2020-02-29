import React from "react";
import { Grid } from "@material-ui/core";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";

export default class SearchBar extends React.Component {
  render() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
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
        <Grid item md={1}>
          <FaShoppingCart color="#42a5f5" size={36} />
        </Grid>
        <Grid item md={1}>
          <FaHeart color="#ec407a" size={36} />
        </Grid>
      </Grid>
    );
  }
}
