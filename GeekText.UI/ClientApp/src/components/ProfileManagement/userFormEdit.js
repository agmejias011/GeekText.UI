import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './confirm';
import Success from './success';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";



const API_URL = process.env.REACT_APP_API_URL;

const useStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    
        width: '100%', // Fix IE 11 issue.
    }
    
export class UserFormEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '1000',
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            user_password: '',
            nickname: '',
            home_address: ''
        }

        this.Cusername = this.Cusername.bind(this);
        this.Cfirst_name = this.Cfirst_name.bind(this);
        this.Clast_name = this.Clast_name.bind(this);
        this.Cemail = this.Cemail.bind(this);
        this.Cuser_password = this.Cuser_password.bind(this);
        this.Cnickname = this.Cnickname.bind(this);
        this.Chome_address = this.Chome_address.bind(this);
        this.editUser = this.editUser.bind(this);

    }

    Cusername(event) {
        this.setState({ username: event.target.value })
    }
    Cfirst_name(event) {
        this.setState({ first_name: event.target.value })
    }
    Clast_name(event) {
        this.setState({ last_name: event.target.value })
    }
    Cemail(event) {
        this.setState({ email: event.target.value })
    }
    Cuser_password(event) {
        this.setState({ user_password: event.target.value })
    }
    Cnickname(event) {
        this.setState({ nickname: event.target.value })
    }
    Chome_address(event) {
        this.setState({ home_address: event.target.value })
    }

    
    componentDidMount() {
        const un = localStorage.getItem("username")
        this.setState({ un })
    }

    async editUser(event) {
        event.preventDefault();

        let data = {
            id: this.state.id,
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            user_password: this.state.user_password,
            nickname: this.state.nickname,
            home_address: this.state.home_address,
        }

        let res = await fetch(
            `${API_URL}/user/1000`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            });

        try {

            res = await res.json();

            if (res.error)
                alert(res.message);

   

        }
        catch{ }
        }

    render() {
        
        return (
                <React.Fragment>

                    <TextField
                        placeholder="Edit Your First Name"
                        label="First Name"
                    onChange={this.Cfirst_name}
                    defaultValue={localStorage.getItem("username")}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        placeholder="Edit Your Last Name"
                        label="Last Name"
                        onChange={this.Clast_name}
                        defaultValue={this.state.last_name}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Nickname"
                        label="Nickname"
                        onChange={this.Cnickname}
                        defaultValue={this.state.nickname}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Username"
                        label="Username"
                        onChange={this.Cusername}
                        defaultValue={this.state.username}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        placeholder="Edit Your Password"
                        label="Password"
                        onChange={this.Cuser_password}
                        defaultValue={this.state.user_password}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Email"
                        label="Email"
                        onChange={this.Cemail}
                        defaultValue={this.state.email}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Home Address"
                        label="Home Address"
                        onChange={this.Chome_address}
                        defaultValue={this.state.home_address}
                        margin="normal"
                    />
                    <br />

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.editUser}
                        style={styles.button}
                    >Update</Button>

                </React.Fragment>
            )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default (withStyles(useStyles)(UserFormEdit));
