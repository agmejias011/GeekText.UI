import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {
        username,
        first_name,
        last_name,
        email,
        user_password,
        nickname,
        home_address
      }
    } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Dialog open="true" fullWidth="true" maxWidth="sm">
            <AppBar title="Confirm User Data" />
            <List>
              <ListItem>
                <ListItemText primary="First Name" secondary={first_name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Last Name" secondary={last_name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Nickname" secondary={nickname} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Username" secondary={username} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Password" secondary={user_password} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Home Address" secondary={home_address} />
              </ListItem>
            </List>
            <br />

            <Button color="secondary" variant="contained" onClick={this.back}>
              Back
            </Button>

            <Button color="primary" variant="contained" onClick={this.continue}>
              Confirm & Continue
            </Button>
          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
