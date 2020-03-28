import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class FormUserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    
                    <TextField
                        placeholder="Enter Your First Name"
                        label="First Name"
                        onChange={handleChange('first_name')}
                        defaultValue={values.first_name}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        placeholder="Enter Your Last Name"
                        label="Last Name"
                        onChange={handleChange('last_name')}
                        defaultValue={values.last_name}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        placeholder="Enter Your Nickname"
                        label="Nickname"
                        onChange={handleChange('nickname')}
                        defaultValue={values.nickname}
                        margin="normal"
                    />
                    <br />
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

export default FormUserDetails;