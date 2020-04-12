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
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import BookCardCart from "./bookCardInCart";
import { Typography } from "@material-ui/core";
import { CartConsumer } from "../ShoppingCart/contextCart";

const Tablestyle = {
  maxWidth: 650,
};

var cellStyle = {
  borderBottom: "none",
};

class SaveForLater extends Component {
  state = {
    book: this.props.book,
  };
  render() {
    return (
      <>
        <TableContainer>
          <Table aria-label="simple table" style={Tablestyle}>
            <TableBody>
              <TableRow>
                <TableCell aligh="center" style={cellStyle}>
                  <BookCardCart book={this.props.book}></BookCardCart>
                  <Button
                    size="small"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    style={{
                      position: "relative",
                      right: "0.5em",
                    }}
                    onClick={() => this.props.onDeleteSave(this.props.book)}
                  >
                    Remove
                  </Button>
                  <CartConsumer>
                    {(value) => {
                      return (
                        <Button
                          size="small"
                          color="primary"
                          startIcon={<ArrowUpwardIcon />}
                          style={{
                            position: "relative",
                            right: "0.5em",
                          }}
                          onClick={() =>
                            this.props.onMoveToCart(this.props.book, value)
                          }
                        >
                          Move to Cart
                        </Button>
                      );
                    }}
                  </CartConsumer>
                </TableCell>
                <TableCell align="center" style={cellStyle}>
                  <NumberFormat
                    value={this.props.book.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="center" style={cellStyle}>
                  <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                  >
                    <Button
                      onClick={() =>
                        this.props.onIncrementSave(this.props.book)
                      }
                    >
                      +
                    </Button>
                    <Button disabled>{this.props.book.orderQTY}</Button>
                    <Button
                      onClick={() =>
                        this.props.onDecrementSave(this.props.book)
                      }
                    >
                      -
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell align="center" style={cellStyle}>
                  <NumberFormat
                    value={this.props.book.itemSubtotal}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default SaveForLater;
