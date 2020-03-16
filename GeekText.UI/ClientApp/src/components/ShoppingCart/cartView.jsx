import React, { Component } from "react";
import CartList from "./cartList";
import ThankyouPage from "./thankYou";

class CartView extends Component {
  state = {
    books: [],
    saveForLater: [],
    showThankyouPage: false
  };

  handleView = books => {
    const bookArray = [books];
    this.setState({ books: bookArray });
    this.setState({ showThankyouPage: true });
  };

  render() {
    const thankyouPage = <ThankyouPage books={this.state.books}></ThankyouPage>;

    const cartPage = (
      <CartList onCheckout={this.handleView} key="CartList"></CartList>
    );

    return this.state.showThankyouPage ? thankyouPage : cartPage;
  }
}
export default CartView;
