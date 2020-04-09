import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import Books from "./components/Books";
import Cart from "./components/ShoppingCart/cartList";
import ThankyouPage from "./components/ShoppingCart/thankYou";
import Books from "./components/bookDetail/Books";
import Details from "./components/bookDetail/Details";
import BooksOfAuthor from "./components/bookDetail/BooksOfAuthor";
import { BookProvider } from "./components/bookDetail/Context";
import { CartProvider } from "./components/ShoppingCart/contextCart";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./components/Home";
import SiteContainer from "./components/site-container";
import LoginPage from "./components/login-page";
import Wishlists from "./components/wishlists";
import signUppage from "./components/signUp-page";
import UserForm from "./components/userForm";

import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <CartProvider>
        <SiteContainer>
          <BookProvider>
            <Switch>
              <Route path="/example-route">Hello world.</Route>
              <Route path="/wishlists">
                <Wishlists />
              </Route>
              <Route path="/books">
                <Books />
              </Route>
              <Route path="/details">
                <Details />
              </Route>
              <Route path="/BooksOfAuthor">
                <BooksOfAuthor />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signUp">
                <UserForm />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/thankyou">
                <ThankyouPage />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </BookProvider>
        </SiteContainer>
      </CartProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
