import React from "react";
import { Grid } from "@material-ui/core";
import mainImage from "../images/main.jpg";
import Books from "../components/bookDetail/Books";

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <img src={mainImage} alt="main image" />
        </div>
        <div className="favorites">
          <h2>Favorite Books</h2>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item md={20}>
              <Books></Books>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
