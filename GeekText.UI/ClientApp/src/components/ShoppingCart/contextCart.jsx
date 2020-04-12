import React, { Component } from "react";

const CartContext = React.createContext();

class CartProvider extends Component {
  state = {
    cartItemsTotal: 0,
  };

  componentWillMount() {
    if (localStorage.getItem("cartItemsTotal")) {
      this.setState({
        cartItemsTotal: JSON.parse(localStorage.getItem("cartItemsTotal")),
      });
    }
  }

  updateCartItemTotal = (cartItemsTotal) => {
    localStorage.setItem("cartItemsTotal", JSON.stringify(cartItemsTotal));
    this.setState({ cartItemsTotal });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          state: this.state,
          updateCartItemTotal: this.updateCartItemTotal,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

const CartConsumer = CartContext.Consumer;

export { CartProvider, CartConsumer };
