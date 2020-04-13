import React, { Component, PropTypes } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './confirm';
import Success from './success';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LoginForm from './login-form';
//import Wishlists from './wishlists';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";



const API_URL = process.env.REACT_APP_API_URL;

const useStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Fix IE 11 issue.
}
    
export class UserForm extends Component {

    constructor(props) {
        super(props);


        this.state = {
            id: '',
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            user_password: '',
            nickname: '',
            home_address: '',
            home_address2: '',
            home_address3: ''
        };

        this.username = this.username.bind(this);
        this.first_name = this.first_name.bind(this);
        this.last_name = this.last_name.bind(this);
        this.email = this.email.bind(this);
        this.user_password = this.user_password.bind(this);
        this.nickname = this.nickname.bind(this);
        this.home_address = this.home_address.bind(this);
        this.home_address2 = this.home_address2.bind(this);
        this.home_address3 = this.home_address3.bind(this);
        this.addUser = this.addUser.bind(this);

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
    home_address2(event) {
        this.setState({ home_address2: event.target.value })
    }
    home_address3(event) {
        this.setState({ home_address3: event.target.value })
    }


   

    handleChange(e) {
        let state = {};

        state[e.target.name] = e.target.value;

        this.setState(state);
    }

    async addUser(event) {
        event.preventDefault();

        let data = {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            user_password: this.state.user_password,
            nickname: this.state.nickname,
            home_address: this.state.home_address,
            home_address2: this.state.home_address2,
            home_address3: this.state.home_address3
        }

        let res = await fetch(
            `${API_URL}/user/create`,
            {
                method: "POST",
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
        
        this.props.history.push('/login');

    }

    async editUser(data) {
        fetch(
            `${API_URL}/user/${data.id}`,
            {
                method: "PUT",
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
                    home_address: this.state.home_address,
                    home_address2: this.state.home_address2,
                    home_address3: this.state.home_address3
                })

            })
    }


    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    // Handle fields change
    //handleChange = input => e => {
      //  this.setState({ [input]: e.target.value });
    //};
    
    render() {
        const { step } = this.state;
        const { username, first_name, last_name, email, user_password, nickname, home_address, home_address2, home_address3 } = this.state;
        const values = { username, first_name, last_name, email, user_password, nickname, home_address, home_address2, home_address3 }

        const { classes } = this.props;

        return (

                <React.Fragment>
                    <div style={useStyles}>

                        <TextField
                            placeholder="Enter Your First Name"
                            label="First Name"
                            onChange={this.handleChange}
                            defaultValue={values.first_name}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            placeholder="Enter Your Last Name"
                            label="Last Name"
                            onChange={this.last_name}
                            defaultValue={values.last_name}
                            margin="normal"
                        />
                        <br />

                        <TextField
                            placeholder="Enter Your Nickname"
                            label="Nickname"
                            onChange={this.nickname}
                            defaultValue={values.nickname}
                            margin="normal"
                        />
                        <br />

                        <TextField
                            placeholder="Enter Your Username"
                            label="Username"
                            onChange={this.username}
                            defaultValue={values.username}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            placeholder="Enter Your Password"
                            label="Password"
                            onChange={this.user_password}
                            defaultValue={values.user_password}
                            margin="normal"
                        />
                        <br />

                        <TextField
                            placeholder="Enter Your Email"
                            label="Email"
                            onChange={this.email}
                            defaultValue={values.email}
                            margin="normal"
                        />
                        <br />

                        <TextField
                            placeholder="Enter Your Home Address"
                            label="Home Address"
                            onChange={this.home_address}
                            defaultValue={values.home_address}
                            margin="normal"
                        />
                        <br />

                        <TextField
                            placeholder="Enter Your Second Address"
                            label="Home Address"
                            onChange={this.home_address2}
                            defaultValue={values.home_address2}
                            margin="normal"
                        />
                        <br />

                        <TextField
                            placeholder="Enter Your Third Address"
                            label="Home Address"
                            onChange={this.home_address3}
                            defaultValue={values.home_address3}
                            margin="normal"
                        />
                        <br />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.addUser}
                            style={styles.button}
                        >Register</Button>
                    </div>
                </React.Fragment>
        );

        /* user form
          
         */

        /* user form with transitions
        switch (step) {
            case 1:
                return (
                    <div style={useStyles}>
                    <FormUserDetails 
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                        />
                    </div>
                );
            case 2:
                return (
                    <div style={useStyles}>

                    <FormPersonalDetails style={useStyles}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                        />
                    </div>
                );
            case 3:
                return (
                    <Confirm style={useStyles}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                );

            case 4:
                return <Success style={useStyles} />;
                
        }
        */

    }
}
const styles = {
    button: {
        margin: 8
    }
}

export default withRouter(UserForm);
