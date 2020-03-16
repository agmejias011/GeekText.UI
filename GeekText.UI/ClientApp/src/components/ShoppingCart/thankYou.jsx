import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

class ThankyouPage extends Component {
  state = {
    books: this.props.books
  };

  handleContinueShopping() {
    console.log("continue shopping was clicked");
  }

  render() {
    return (
      <>
        <React.Fragment>
          <Typography variant="h5" gutterBottom></Typography>
          <Typography variant="subtitle1">
            <div
              style={{
                height: "15em",
                width: "35em",
                position: "absolute",
                left: "30%",
                top: "5em"
              }}
            >
              <Paper elevation={3} m={5} style={{ textAlign: "center" }}>
                <h2>Thank you for your order!</h2>
                <p>
                  Your order number is
                  <span style={{ fontWeight: "bold" }}> #2001539</span>. We have
                  emailed your order confirmation, and will send you an update
                  when your order has shipped.
                </p>
                <Link to="/">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    style={{ height: "4em" }}
                    onClick={this.handleContinueShopping}
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </Paper>
            </div>
          </Typography>
        </React.Fragment>
      </>
    );
  }
}

export default ThankyouPage;
