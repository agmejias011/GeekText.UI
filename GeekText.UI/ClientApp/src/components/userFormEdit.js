import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './confirm';
import Success from './success';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Wishlists from './wishlists';


const API_URL = process.env.REACT_APP_API_URL;

const useStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    
        width: '100%', // Fix IE 11 issue.
    }
    
export class UserForm extends Component {

    constructor() { 
        super();

    this.state = {
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        user_password: '',
        nickname: '',
        home_address: '',
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

    async addUser(event) {
        fetch(
            `${API_URL}/User/create`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    user_password: this.state.user_password,
                    nickname: this.state.nickname,
                    home_address: this.state.home_address,
                })
            })
    }

    render() {
        const { step } = this.state;
        const { username, first_name, last_name, email, user_password, nickname, home_address } = this.state;
        const values = { username, first_name, last_name, email, user_password, nickname, home_address}

        return (
            <MuiThemeProvider>
                <React.Fragment>

                    <TextField
                        placeholder="Edit Your First Name"
                        label="First Name"
                        onChange={this.first_name}
                        defaultValue={values.first_name}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        placeholder="Edit Your Last Name"
                        label="Last Name"
                        onChange={this.last_name}
                        defaultValue={values.last_name}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Nickname"
                        label="Nickname"
                        onChange={this.nickname}
                        defaultValue={values.nickname}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Username"
                        label="Username"
                        onChange={this.username}
                        defaultValue={values.username}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        placeholder="Edit Your Password"
                        label="Password"
                        onChange={this.user_password}
                        defaultValue={values.user_password}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Email"
                        label="Email"
                        onChange={this.email}
                        defaultValue={values.email}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Home Address"
                        label="Home Address"
                        onChange={this.home_address}
                        defaultValue={values.home_address}
                        margin="normal"
                    />
                    <br />

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.addUser}
                        style={styles.button}
                    >Update</Button>

                </React.Fragment>
            </MuiThemeProvider>
            )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default (withStyles(useStyles)(UserForm));
