import React from "react";
import { Container, Grid } from "@material-ui/core";
import SearchBar from "./SearchBar";

export default class Home extends React.Component {
  render() {
    return (
      <Container maxWidth="lg" className="home">
        <SearchBar />
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
      </Container>
    );
  }
}
