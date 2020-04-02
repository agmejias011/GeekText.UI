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
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';



const API_URL = process.env.REACT_APP_API_URL;

const useStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Fix IE 11 issue.
    marginTop: 100,
}

export class profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //step: 1,
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            user_password: '',
            nickname: '',
            home_address: '',
        };

        this.username = this.username.bind(this);
        this.first_name = this.first_name.bind(this);
        this.last_name = this.last_name.bind(this);
        this.email = this.email.bind(this);
        this.user_password = this.user_password.bind(this);
        this.nickname = this.nickname.bind(this);
        this.home_address = this.home_address.bind(this);
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

    async addUser(event) {

        let data = {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            user_password: this.state.user_password,
            nickname: this.state.nickname,
            home_address: this.state.home_address,
        }

        fetch(
            `${API_URL}/user/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((Response) => Response.json()).then((Result) => {
                if (Result.Status == 'Success')
                    this.props.history.push("/login");
                else
                    alert('sorry')
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
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    render() {
        const { step } = this.state;
        const { username, first_name, last_name, email, user_password, nickname, home_address } = this.state;
        const values = { username, first_name, last_name, email, user_password, nickname, home_address }

        const { classes } = this.props;

        return (

            <Container component="main" maxWidth="xs">

                <div style={useStyles}>
                    <Avatar style={{ height: 70, width: 70 }} alt="P" src="/profilePic.svg" />

                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.addUser}
                        style={styles.button}
                    >Edit Profile</Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.addUser}
                        style={styles.button}
                    >Wishlists</Button>
                </div>
            </Container>

        );

        /* user form
          <MuiThemeProvider>

                <React.Fragment>
                    <div style={useStyles}>

                    <TextField
                        placeholder="Enter Your First Name"
                        label="First Name"
                        onChange={this.first_name}
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

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.addUser}
                        style={styles.button}
                    >Register</Button>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
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
        margin: 15
    }
}

export default profile;
