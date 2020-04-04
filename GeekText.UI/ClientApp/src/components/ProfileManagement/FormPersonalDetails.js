import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class FormPersonalDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    
                    <TextField
                        placeholder="Enter Your Username"
                        label="Username"
                        onChange={handleChange('username')}
                        defaultValue={values.username}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        placeholder="Enter Your Password"
                        label="Password"
                        onChange={handleChange('user_password')}
                        defaultValue={values.user_password}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Enter Your Email"
                        label="Email"
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Enter Your Home Address"
                        label="Home Address"
                        onChange={handleChange('home_address')}
                        defaultValue={values.home_address}
                        margin="normal"
                    />
                    <br />

                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={this.back}
                    >Back</Button>

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.continue}
                        style={styles.button}
                        >Continue</Button>

                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormPersonalDetails;