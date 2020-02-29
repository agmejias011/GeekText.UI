import React from "react";
import { Grid } from "@material-ui/core";

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="heroImage">
          <h2>Coming Soon</h2>
        </div>
        <div className="favorites">
          <h2>Favorite Books!</h2>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item md={4}>
              <div className="book"></div>
            </Grid>
            <Grid item md={4}>
              <div className="book"></div>
            </Grid>
            <Grid item md={4}>
              <div className="book"></div>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
