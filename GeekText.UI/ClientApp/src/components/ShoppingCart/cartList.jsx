import React, { Component } from "react";
import Cart from "./cart";
import CartBar from "./CartBar";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { render } from "@testing-library/react";
import SaveForLater from "./saveForLater";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import SearchBar from "../SearchBar";
import ThankyouPage from "./thankYou";
import { Grid, Paper, Typography } from "@material-ui/core";
import ThankyouSaved from "./ThankyouDialog";
import AlreadySavedBook from "./alreadySaved";
import { CartConsumer } from "../ShoppingCart/contextCart";

window.$cartTotal = 0;
window.$item_line = [];

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const Tablestyle = {
  maxWidth: "50%",
};

var cellStyle = {
  borderBottom: "none",
  width: "100%",
};

const CartIconStyle = {
  position: "absolute",
  top: "0.81em",
  left: "92.1em",
};
const margingStyle = {
  marginLeft: 20,
  marginTop: 40,
};

const margingStyleTop = {
  marginTop: 50,
};

const verticalDividerStyle = {
  borderRight: "0.1em solid black",
  padding: "0.5em",
};

const summaryOrderStyle = {
  position: "absolute",
  top: "7em",
  left: "75em",
  maxWidth: "30%",
};

const CartStyle = {
  marginLeft: "15em",
};
const orderDetailStyle = {
  position: "absolute",
  top: "6em",
  left: "-2em",
};

class CartList extends Component {
  state = {
    books: [],
    saveForLater: [],
    user_id: 1001, // this will come from signed in user.
    order_id: 0,
    placed_order: false,
    savedbooks: false,
    bookAlreadySaved: false,
  };

  componentWillMount() {
    if (localStorage.getItem("cartItems")) {
      this.setState({
        books: JSON.parse(localStorage.getItem("cartItems")),
      });
    }

    if (localStorage.getItem("cartItemsSaved")) {
      this.setState({
        saveForLater: JSON.parse(localStorage.getItem("cartItemsSaved")),
      });
    }
  }

  //complete the back end with the json format and finish the integration here
  handleSaveForNoCart = () => {
    let savedForLaterBooks = [];
    let savedBook = {};

    this.state.saveForLater.map(
      (b) => (
        (savedBook = {
          book_id: b.id,
          user_id: this.state.user_id,
          saved_qty: b.orderQTY,
        }),
        (savedForLaterBooks = savedForLaterBooks.concat(savedBook))
      )
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(savedForLaterBooks),
    };

    fetch(
      "http://localhost:5000/api/save-books/create",
      requestOptions
    ).then((response) => response.json());

    this.setState({ savedbooks: true });

    this.setState({ saveForLater: [] });
    localStorage.setItem("cartItemsSaved", JSON.stringify([]));
  };

  handlePlaceOrder = (value) => {
    let item_line_all = []; //item_line json to send
    let item_line = {};

    this.state.books.map(
      (b) => (
        (item_line = {
          cart_id: 0,
          book_id: b.id,
          ordered_qty: b.orderQTY,
          book_price: b.itemSubtotal,
        }),
        (item_line_all = item_line_all.concat(item_line))
      )
    );

    let saveForLater_all = []; //saveForLater json to send
    let saveForLater = {};

    this.state.saveForLater.map(
      (b) => (
        (saveForLater = {
          book_id: b.id,
          saved_qty: b.orderQTY,
        }),
        (saveForLater_all = saveForLater_all.concat(saveForLater))
      )
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart_total: this.state.books.reduce(
          (acc, b) => acc + b.itemSubtotal,
          0
        ),
        item_total: this.state.books.reduce((acc, b) => acc + b.orderQTY, 0),
        user_id: this.state.user_id,
        item_line: item_line_all,
        item_line_saved: saveForLater_all,
      }),
    };

    fetch("http://localhost:5000/api/cart/create", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ order_id: data.id }));

    this.setState({ placed_order: true });

    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.setItem("cartItemsSaved", JSON.stringify([]));

    localStorage.setItem("cartItemsTotal", JSON.stringify(0));

    value.updateCartItemTotal(0);
  };

  handleIncrement = (book, value) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...book };
    books[index].orderQTY++;
    books[index].itemSubtotal = books[index].price * books[index].orderQTY;
    this.setState({ books });

    localStorage.setItem("cartItems", JSON.stringify(books));

    let cartItemsTotal = JSON.parse(localStorage.getItem("cartItems")).reduce(
      (acc, b) => acc + b.orderQTY,
      0
    );
    localStorage.setItem("cartItemsTotal", JSON.stringify(cartItemsTotal));

    value.updateCartItemTotal(cartItemsTotal);
  };

  handleDecrement = (book, value) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...book };

    if (books[index].orderQTY - 1 <= 0) {
      // remove from cart
      let bookStorage = this.state.books.filter((b) => b.id !== book.id);
      this.setState({
        books: bookStorage,
      });

      localStorage.setItem("cartItems", JSON.stringify(bookStorage));
    } else {
      books[index].orderQTY--;
      books[index].itemSubtotal = books[index].price * books[index].orderQTY;
      this.setState({ books });

      localStorage.setItem("cartItems", JSON.stringify(books));
    }

    let cartItemsTotal = JSON.parse(localStorage.getItem("cartItems")).reduce(
      (acc, b) => acc + b.orderQTY,
      0
    );
    localStorage.setItem("cartItemsTotal", JSON.stringify(cartItemsTotal));

    value.updateCartItemTotal(cartItemsTotal);
  };

  handleDelete = (book, value) => {
    const books = this.state.books.filter((b) => b.id !== book.id);
    this.setState({ books });
    this.forceUpdate();
    localStorage.setItem("cartItems", JSON.stringify(books));

    this.setState({
      subtotal: this.state.books.reduce((acc, b) => acc + b.itemSubtotal, 0),
    });

    let cartItemsTotal = books.reduce((acc, b) => acc + b.orderQTY, 0);
    localStorage.setItem("cartItemsTotal", JSON.stringify(cartItemsTotal));

    value.updateCartItemTotal(cartItemsTotal);
  };

  handleSave = (book, value) => {
    let savedBook = this.state.saveForLater.filter((p) => p.id === book.id);

    if (savedBook.length !== 0) {
      //book already saved, just add the quantities
      this.setState({ bookAlreadySaved: true });

      const books = [...this.state.saveForLater];
      const index = books.findIndex((item) => item.id === book.id);

      books[index].orderQTY = books[index].orderQTY + book.orderQTY;
      books[index].itemSubtotal = books[index].price * books[index].orderQTY;

      this.setState({ saveForLater: books });

      localStorage.setItem("cartItemsSaved", JSON.stringify(books));
    } else {
      const saveForLater = this.state.saveForLater.concat(book);
      this.setState({ saveForLater });
      localStorage.setItem("cartItemsSaved", JSON.stringify(saveForLater));
    }
    this.handleDelete(book, value);
    this.renderSave();
  };

  renderSaveButton() {
    return (
      <Grid container>
        <Grid item>
          <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell aligh="center">
                    If you want to save these books for later, click save.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      style={{
                        borderRadius: 0,
                        color: "#fff",
                        background: "#111",
                        height: "4em",
                      }}
                      onClick={() => this.handleSaveForNoCart()}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
  renderSave() {
    if (this.state.saveForLater.length > 0) {
      return (
        <>
          <Typography>
            <h1>Save for Later</h1>
          </Typography>
          <div>
            {this.state.saveForLater.map((b) => (
              <SaveForLater
                onIncrementSave={this.handleIncrementSave}
                onDecrementSave={this.handleDecrementSave}
                onDeleteSave={this.handleDeleteSave}
                onMoveToCart={this.handleMoveToCart}
                key={b.id}
                book={b}
              ></SaveForLater>
            ))}
          </div>
          <div>{this.renderSaveButton()}</div>
        </>
      );
    }
  }

  handleIncrementSave = (book) => {
    const saveForLater = [...this.state.saveForLater];
    const index = saveForLater.indexOf(book);
    saveForLater[index] = { ...book };
    saveForLater[index].orderQTY++;
    saveForLater[index].itemSubtotal =
      saveForLater[index].price * saveForLater[index].orderQTY;
    this.setState({ saveForLater });

    localStorage.setItem("cartItemsSaved", JSON.stringify(saveForLater));
  };

  handleDecrementSave = (book) => {
    const saveForLater = [...this.state.saveForLater];
    const index = saveForLater.indexOf(book);
    saveForLater[index] = { ...book };

    if (saveForLater[index].orderQTY - 1 <= 0) {
      // remove from cart
      const bookSaved = this.state.saveForLater.filter((b) => b.id !== book.id);
      this.setState({
        saveForLater: bookSaved,
      });

      localStorage.setItem("cartItemsSaved", JSON.stringify(bookSaved));
    } else {
      saveForLater[index].orderQTY--;
      saveForLater[index].itemSubtotal =
        saveForLater[index].price * saveForLater[index].orderQTY;
      this.setState({ saveForLater });
      localStorage.setItem("cartItemsSaved", JSON.stringify(saveForLater));
    }
  };

  handleDeleteSave = (book) => {
    const saveForLater = this.state.saveForLater.filter(
      (b) => b.id !== book.id
    );
    this.setState({
      saveForLater,
    });
    localStorage.setItem("cartItemsSaved", JSON.stringify(saveForLater));
  };

  handleMoveToCart = (book, value) => {
    const books = this.state.books.concat(book);
    this.setState({ books });

    localStorage.setItem("cartItems", JSON.stringify(books));

    this.handleDeleteSave(book);

    let cartItemsTotal = JSON.parse(localStorage.getItem("cartItems")).reduce(
      (acc, b) => acc + b.orderQTY,
      0
    );

    localStorage.setItem("cartItemsTotal", JSON.stringify(cartItemsTotal));

    value.updateCartItemTotal(cartItemsTotal);
  };

  emptyCart() {
    if (this.state.books.reduce((acc, b) => acc + b.orderQTY, 0) <= 0) {
      return (
        <Typography
          style={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Your cart is currently empty
        </Typography>
      );
    }
  }

  renderCarts() {
    return (
      <div>
        {this.state.books.map((b) => (
          <>
            <Cart
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
              onSave={this.handleSave}
              key={b.id}
              book={b}
            ></Cart>
          </>
        ))}
      </div>
    );
  }

  renderBadge() {
    if (this.state.books.reduce((acc, b) => acc + b.orderQTY, 0) >= 0) {
      return this.state.books.reduce((acc, b) => acc + b.orderQTY, 0);
    }

    return 0;
  }

  renderSubtotal() {
    if (this.state.books.reduce((acc, b) => acc + b.itemSubtotal, 0) >= 0) {
      return this.state.books
        .reduce((acc, b) => acc + b.itemSubtotal, 0)
        .toFixed(1);
    }

    return 0;
  }

  renderOrderSummary() {
    if (this.state.books.reduce((acc, b) => acc + b.orderQTY, 0) > 0) {
      return (
        <div>
          <Typography>
            <Paper elevation={1} style={{ height: "100%" }}>
              <h2 style={{ textAlign: "center" }}>Order Summary</h2>
              <TableContainer>
                <Table aria-label="simple table" style={{ maxWidth: "100%" }}>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left" style={cellStyle}>
                        <span>Subtotal </span>
                        <span>({this.renderBadge()} items)</span>
                      </TableCell>
                      <TableCell align="right" style={cellStyle}>
                        <NumberFormat
                          value={this.renderSubtotal()}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" style={cellStyle}>
                        <span>Estimated Shipping</span>
                      </TableCell>
                      <TableCell align="right" style={cellStyle}>
                        <span>Free</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" style={cellStyle}>
                        <span>Estimated Tax</span>
                      </TableCell>
                      <TableCell align="right" style={cellStyle}>
                        <span>$0.00</span>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="left" style={cellStyle}>
                        <h2>Order Total: </h2>
                      </TableCell>
                      <TableCell align="right" style={cellStyle}>
                        <h2>
                          <NumberFormat
                            value={this.renderSubtotal()}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </h2>
                      </TableCell>
                    </TableRow>
                    <TableRow></TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <CartConsumer>
                {(value) => {
                  return (
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      style={{ height: "4em" }}
                      onClick={() => this.handlePlaceOrder(value)}
                      style={{
                        borderRadius: 0,
                        color: "#fff",
                        background: "#111",
                        height: "4em",
                      }}
                    >
                      Place Order
                    </Button>
                  );
                }}
              </CartConsumer>
            </Paper>
          </Typography>
        </div>
      );
    }
  }

  renderCartView() {
    if (this.state.placed_order === true) {
      return <ThankyouPage orderNumber={this.state.order_id}></ThankyouPage>;
    }

    if (this.state.savedbooks === true) {
      return (
        <>
          <ThankyouSaved></ThankyouSaved>
          <Paper elevation={0} style={{ marginTop: "50px" }}>
            <Grid container direction="row">
              <Grid item sm>
                {this.renderCarts()}
              </Grid>
              <Grid item sm>
                {this.renderOrderSummary()}
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={3} style={{ marginTop: "80px" }}>
            <Grid container>
              <Grid item sm>
                <div>{this.renderSave()}</div>
              </Grid>
            </Grid>
          </Paper>
        </>
      );
    }

    if (this.state.bookAlreadySaved === true) {
      return (
        <>
          <AlreadySavedBook></AlreadySavedBook>
          <Paper elevation={0} style={{ marginTop: "50px" }}>
            <Grid container direction="row">
              <Grid item sm>
                {this.renderCarts()}
              </Grid>
              <Grid item sm>
                {this.renderOrderSummary()}
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={3} style={{ marginTop: "80px" }}>
            <Grid container>
              <Grid item sm>
                <div>{this.renderSave()}</div>
              </Grid>
            </Grid>
          </Paper>
        </>
      );
    }

    return (
      <>
        <Paper style={{ marginTop: "50px" }}>
          <Grid container direction="row">
            <Grid item sm>
              {this.renderCarts()}
            </Grid>
            <Grid item sm>
              {this.renderOrderSummary()}
            </Grid>
          </Grid>
        </Paper>
        <Paper style={{ marginTop: "80px" }}>
          <Grid container>
            <Grid item sm>
              <div>{this.renderSave()}</div>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
  render() {
    return (
      <>
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>Cart</h1>
        {this.emptyCart()}
        {this.renderCartView()}
      </>
    );
  }
}

export default CartList;
