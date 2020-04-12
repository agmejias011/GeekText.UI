import React, { PureComponent } from "react";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { render } from "@testing-library/react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { CartConsumer } from "./contextCart";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

class CartBar extends PureComponent {
  state = {
    cartItemsTotal: 0,
  };

  componentDidMount() {
    if (localStorage.getItem("cartItemsTotal")) {
      this.setState({
        cartItemsTotal: JSON.parse(localStorage.getItem("cartItemsTotal")),
      });
    }
  }

  render() {
    return (
      <CartConsumer>
        {(value) => {
          const cartItemsTotal = value.state.cartItemsTotal;
          return (
            <Link to="/cart">
              <IconButton aria-label="cart" size="medium">
                <StyledBadge
                  badgeContent={cartItemsTotal}
                  color="secondary"
                  style={{ color: "#42a5f5" }}
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          );
        }}
      </CartConsumer>
    );
  }
}

export default CartBar;
