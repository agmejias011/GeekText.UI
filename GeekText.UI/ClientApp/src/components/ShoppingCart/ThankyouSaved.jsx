import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Box from "@material-ui/core/Box";

class ThankyouSaved extends Component {
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
                  width: "35em"
                }}
              >
                <Paper elevation={3} m={5} style={{ textAlign: "center" }}>
                  <h2>Your books have been saved!</h2>
                  <p>
                    We have saved your books into your account. You can get your
                    saved books later.
                  </p>
                  <Link to="/books">
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
            </Box>
          </Typography>
        </React.Fragment>
      </>
    );
  }
}

export default ThankyouSaved;
