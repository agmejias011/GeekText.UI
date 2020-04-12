import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Box from "@material-ui/core/Box";

class ThankyouPage extends Component {
  render() {
    return (
      <>
        <React.Fragment>
          <Typography variant="h5" gutterBottom></Typography>
          <Typography variant="subtitle1">
            <Box ml={"27%"} mt={"18%"}>
              <div
                style={{
                  height: "15em",
                  width: "35em",
                }}
              >
                <Paper elevation={3} m={5} style={{ textAlign: "center" }}>
                  <h2>Thank you for your order!</h2>
                  <p>
                    Your order number is
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      #{this.props.orderNumber}
                    </span>
                    . We have emailed your order confirmation, and will send you
                    an update when your order has shipped.
                  </p>
                  <Link to="/books">
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      style={{
                        borderRadius: 0,
                        color: "#fff",
                        background: "#111",
                        height: "4em",
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </Paper>
              </div>
            </Box>
          </Typography>
        </React.Fragment>
      </>
    );
  }
}

export default ThankyouPage;
