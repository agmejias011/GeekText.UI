import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import NumberFormat from "react-number-format";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import BookCardCart from "./bookCardInCart";
import Typography from "@material-ui/core/Typography";
import { CartConsumer } from "../ShoppingCart/contextCart";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const Tablestyle = {
  maxWidth: "100%",
};

var cellStyle = {
  borderBottom: "none",
};

class Cart extends Component {
  state = {
    book: this.props.book,
  };

  render() {
    return (
      <>
        <CartConsumer>
          {(value) => {
            return (
              <TableContainer>
                <Table aria-label="simple table" style={Tablestyle}>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left" style={cellStyle}>
                        <BookCardCart book={this.props.book}></BookCardCart>
                        <Button
                          size="small"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          style={{
                            position: "relative",
                            bottom: "1.5em",
                            right: "0.5em",
                            marginTop: "15px",
                            margingLeft: "10px",
                          }}
                          onClick={() =>
                            this.props.onDelete(this.props.book, value)
                          }
                        >
                          Remove
                        </Button>
                        <span> </span>
                        <Button
                          size="small"
                          color="primary"
                          size="small"
                          startIcon={<SaveIcon />}
                          style={{
                            position: "relative",
                            bottom: "1.5em",
                            right: "0.5em",
                            marginTop: "15px",
                            margingLeft: "10px",
                          }}
                          onClick={() =>
                            this.props.onSave(this.props.book, value)
                          }
                        >
                          Save for Later
                        </Button>
                      </TableCell>
                      <TableCell align="right" style={cellStyle}>
                        <Typography>
                          <h8>
                            <NumberFormat
                              value={this.props.book.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </h8>
                        </Typography>
                      </TableCell>
                      <TableCell align="right" style={cellStyle}>
                        <ButtonGroup
                          size="small"
                          aria-label="small outlined button group"
                        >
                          <Button
                            onClick={() =>
                              this.props.onIncrement(this.props.book, value)
                            }
                          >
                            +
                          </Button>
                          <Button disabled>{this.props.book.orderQTY}</Button>
                          <Button
                            onClick={() =>
                              this.props.onDecrement(this.props.book, value)
                            }
                          >
                            -
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="center" style={cellStyle}>
                        <Typography>
                          <h6>
                            <NumberFormat
                              value={this.props.book.itemSubtotal.toFixed(1)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </h6>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }}
        </CartConsumer>
      </>
    );
  }
}
export default Cart;
