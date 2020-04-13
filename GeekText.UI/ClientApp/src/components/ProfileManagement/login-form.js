import React, { Component, PropTypes } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { updateState } from "../../redux/actions/index";
import { withRouter } from "react-router-dom";


const API_URL = process.env.REACT_APP_API_URL;

const useStyles = theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username : "",
			password : ""
		};
	}

	handleChange(e) {
		let state = {};

		state[e.target.name] = e.target.value;

		this.setState(state);
	}

	render() {
		const { classes } = this.props;

		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign In
					</Typography>
					<form className={classes.form} noValidate onSubmit={this.tryLogin.bind(this)}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							value={this.state.username}
							onChange={this.handleChange.bind(this)}
							autoComplete="username"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={this.state.password}
							onChange={this.handleChange.bind(this)}
							autoComplete="current-password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href={"/signUp"} variant="body2">
								{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}

	async tryLogin(e) {
		e.preventDefault();

		let data = {
			username : this.state.username,
			password : this.state.password
		};
		let res  = await fetch(
			`${API_URL}/Authentication/`,
			{
				method  : "POST",
				headers : {
					"Content-Type" : "application/json"
				},
				body : JSON.stringify(data)
			}
		);

		try {
			res = await res.json();
			
			if (!res.success) {
				alert("Login failed.");
				return;
			}

			this.props.updateState({
				key   : "user",
				value : res.user
			});

			this.props.updateState({
				key   : "authenticated",
				value : true
			});

		} catch { }
		alert("Logged in.");

		this.props.history.push('/');
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateState : (data) => {
			dispatch(updateState(data));
		}
	}
};

export default connect(null, mapDispatchToProps)(withRouter(withStyles(useStyles)(LoginForm)));