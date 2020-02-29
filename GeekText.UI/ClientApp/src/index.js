import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import SiteContainer from "./components/site-container";
import Wishlists from "./components/wishlists";

import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <SiteContainer>
      <Switch>
        <Route path="/example-route">Hello world.</Route>
        <Route path="/wishlists">
          <Wishlists />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </SiteContainer>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
