import React from "react";
import { Container } from "@material-ui/core";
import SearchBar from "./SearchBar";

export default class Home extends React.Component {
  render() {
    return (
      <Container maxWidth="lg" className="home">
        <SearchBar />
      </Container>
    );
  }
}
