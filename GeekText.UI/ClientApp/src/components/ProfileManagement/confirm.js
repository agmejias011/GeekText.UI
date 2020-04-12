import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
const API_URL = process.env.REACT_APP_API_URL;

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

   
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            email: this.props.email,
            user_password: this.props.user_password,
            nickname: this.props.nickname,
            home_address: this.props.home
        }

        this.username = this.username.bind(this);
        this.first_name = this.first_name.bind(this);
        this.last_name = this.last_name.bind(this);
        this.email = this.email.bind(this);
        this.user_password = this.user_password.bind(this);
        this.nickname = this.nickname.bind(this);
        this.home_address = this.home_address.bind(this);

    }

    username(event) {
        this.setState({ username: event.target.value })
    }
    first_name(event) {
        this.setState({ first_name: event.target.value })
    }
    last_name(event) {
        this.setState({ last_name: event.target.value })
    }
    email(event) {
        this.setState({ email: event.target.value })
    }
    user_password(event) {
        this.setState({ user_password: event.target.value })
    }
    nickname(event) {
        this.setState({ nickname: event.target.value })
    }
    home_address(event) {
        this.setState({ home_address: event.target.value })
    }

    addUser(data) {
        fetch(
            `${API_URL}/User/${data.id}`,
            {
                method: "POST",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    user_password: this.state.user_password,
                    nickname: this.state.nickname,
                    home_address: this.state.home_address
                })
            })
    }

    render() {
        
    const {
        values: { username, first_name, last_name, email, user_password, nickname, home_address}
        } = this.props;

    return (
      <MuiThemeProvider >
        <React.Fragment>
          <Dialog
            open="true"
            fullWidth="true"
            maxWidth='sm'
          >
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
        
          <Button
            color="secondary"
            variant="contained"
            onClick={this.back}
          >Back</Button>

          <Button
            color="primary"
                        variant="contained"
                        onClick={this.addUser}
          >Confirm & Continue</Button>
          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
    }
    /*
    async addUser(e) {
        //e.preventDefault();

        const {
            values: { username, first_name, last_name, email, user_password, nickname, home_address }
        } = this.props;

        let data = {
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            user_password: user_password,
            nickname: nickname,
            home_address: home_address
        };

        let res = await fetch(
            `${API_URL}/User/${data.id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.props)
            }
        );
    }
    */
}

export default Confirm;