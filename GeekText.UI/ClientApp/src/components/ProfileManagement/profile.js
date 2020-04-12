import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './confirm';
import Success from './success';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import Wishlists from './wishlists';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { updateState } from "../../redux/actions/index";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = theme => ({
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Fix IE 11 issue.
        marginTop: 100
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
});


export class Profile extends Component {

    logout() {
        this.props.updateState({
            key: "authenticated",
            value: false
        });
    }

    render() {
        console.log(this.props.authenticated);

        const { classes } = this.props;

        return (
            <div className={classes.center}>
                <Avatar className={classes.avatar} />
            <br />
            <Button
                href={"/editProfile"}
                color="primary"
                variant="contained"
                style={styles.button}
                >Edit Profile</Button>

            <Button
                href={"/"}
                color="primary"
                variant="contained"
                onClick={this.logout.bind(this)}
                style={styles.button}
                >Logout</Button>
            </div>

        );

    }
}
const styles = {
    button: {
        margin: 15
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (data) => {
            dispatch(updateState(data));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Profile));
