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
import { connect } from 'react-redux'
import { updateState } from "../../redux/actions/index";
import bcrypt from 'bcryptjs';


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
            id: this.props.user.id,
            username: this.props.username,
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            email: this.props.email,
            user_password: this.props.user_password,
            nickname: this.props.nickname,
            home_address: this.props.home_address,
            home_address2: this.props.home_address2,
            home_address3: this.props.home_address3
        }

        this.Cusername = this.Cusername.bind(this);
        this.Cfirst_name = this.Cfirst_name.bind(this);
        this.Clast_name = this.Clast_name.bind(this);
        this.Cemail = this.Cemail.bind(this);
        this.Cuser_password = this.Cuser_password.bind(this);
        this.Cnickname = this.Cnickname.bind(this);
        this.Chome_address = this.Chome_address.bind(this);
        this.Chome_address2 = this.Chome_address2.bind(this);
        this.Chome_address3 = this.Chome_address3.bind(this);
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
    Chome_address2(event) {
        this.setState({ home_address2: event.target.value })
    }
    Chome_address3(event) {
        this.setState({ home_address3: event.target.value })
    }

    async editUser(event) {
        event.preventDefault();

        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(this.state.user_password, salt);

        let data = {
            id: this.state.id,
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            user_password: hash,
            nickname: this.state.nickname,
            home_address: this.state.home_address,
            home_address2: this.state.home_address2,
            home_address3: this.state.home_address3

        }

        let res = await fetch(
            `${API_URL}/user/${this.props.user.id}`,
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

            this.props.updateState({
                key: "user",
                value: res.user
            });

        }
        catch{ }

        }

    render() {
        const { user } = this.props;
        return (
                <React.Fragment>
                <div style={useStyles}>
                    <TextField
                        placeholder="Edit Your First Name"
                        label="First Name"
                        onChange={this.Cfirst_name}
                        defaultValue={this.props.user.first_name}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        placeholder="Edit Your Last Name"
                        label="Last Name"
                        onChange={this.Clast_name}
                        defaultValue={this.props.user.last_name}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Nickname"
                        label="Nickname"
                        onChange={this.Cnickname}
                        defaultValue={this.props.user.nickname}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Username"
                        label="Username"
                        onChange={this.Cusername}
                        defaultValue={this.props.user.username}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        placeholder="Edit Your Password"
                        label="Password"
                        onChange={this.Cuser_password}
                        defaultValue={this.props.user.user_password}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Email"
                        label="Email"
                        onChange={this.Cemail}
                        defaultValue={this.props.user.email}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Edit Your Home Address"
                        label="Home Address"
                        onChange={this.Chome_address}
                        defaultValue={this.props.user.home_address}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Enter Your Second Address"
                        label="Second Home Address"
                        onChange={this.Chome_address2}
                        defaultValue={this.props.home_address2}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Enter Your Third Address"
                        label="Third Home Address"
                        onChange={this.Chome_address3}
                        defaultValue={this.props.home_address3}
                        margin="normal"
                    />
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.editUser}
                        style={styles.button}
                    >Update</Button>
                </div>
                </React.Fragment>
        )
        
    }
}

const styles = {
    button: {
        margin: 15
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (data) => {
            dispatch(updateState(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFormEdit);
