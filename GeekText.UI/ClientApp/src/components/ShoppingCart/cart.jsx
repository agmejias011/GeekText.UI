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

const Tablestyle = {
  maxWidth: "100%"
};

var cellStyle = {
  borderBottom: "none",
  maxWidth: "100%"
};

class Cart extends Component {
  state = {
    book: this.props.book
  };

  render() {
    return (
      <>
        <TableContainer>
          <Table aria-label="simple table" style={Tablestyle}>
            <TableBody>
              <>
                <TableRow>
                  <TableCell align="left" style={cellStyle}>
                    <h3>{this.props.book.name}</h3>
                    <Button
                      size="small"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      style={{
                        position: "relative",
                        bottom: "1.5em",
                        right: "0.5em"
                      }}
                      onClick={() => this.props.onDelete(this.props.book)}
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
                        right: "0.5em"
                      }}
                      onClick={() => this.props.onSave(this.props.book)}
                    >
                      Save for Later
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <h3>
                      <NumberFormat
                        value={this.props.book.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </h3>
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup
                      size="small"
                      aria-label="small outlined button group"
                    >
                      <Button
                        onClick={() => this.props.onIncrement(this.props.book)}
                      >
                        +
                      </Button>
                      <Button disabled>{this.props.book.orderQTY}</Button>
                      <Button
                        onClick={() => this.props.onDecrement(this.props.book)}
                      >
                        -
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell align="center" style={cellStyle}>
                    <h3>
                      <NumberFormat
                        value={this.props.book.itemSubtotal}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </h3>
                  </TableCell>
                </TableRow>
              </>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}
export default Cart;
