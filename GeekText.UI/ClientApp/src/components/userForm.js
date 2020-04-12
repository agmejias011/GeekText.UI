import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './confirm';
import Success from './success';
import { withStyles } from '@material-ui/core/styles';


const useStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    
        width: '100%', // Fix IE 11 issue.
    }
    
export class UserForm extends Component {
   
    state = {
        step: 1,
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        user_password: '',
        nickname: '',
        home_address: ''
    };

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
        const values = { username, first_name, last_name, email, user_password, nickname, home_address}

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
    }
}

export default (withStyles(useStyles)(UserForm));
