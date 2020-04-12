import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from '@material-ui/core/TextField';

const useStyles = theme => ({
	root : {
		"& > *" : {
			margin : theme.spacing(1)
		}
	}
});

class WishlistRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			primary_checked : (this.props.wishlist) ? this.props.wishlist.primary : false
		}
	}

	togglePrimary = () => {
		this.setState(prev_state => ({
			primary_checked : !prev_state.primary_checked
		}));
	}

	componentDidUpdate() {
		let wishlist = this.props.wishlist;

		if (wishlist && wishlist.primary !== this.state.primary_checked) {
			this.togglePrimary();
		}
	}

	render() {
		const { classes } = this.props;

		let wishlist = this.props.wishlist;

		if (wishlist) {
			return (
				<TableRow key={wishlist.id} data-id={wishlist.id}>
					<TableCell>{wishlist.name}</TableCell>
					<TableCell>{(wishlist.wishlist_books) ? wishlist.wishlist_books.length : 0}</TableCell>
					<TableCell>
						<Checkbox checked={this.state.primary_checked} onChange={this.makePrimary.bind(this, wishlist)}/>
					</TableCell>
					<TableCell className={classes.root}>
						<Button variant="contained" onClick={this.delete.bind(this, wishlist)}>Delete</Button>
						<Link to={"/wishlists/" + wishlist.id}>
							<Button variant="contained">View</Button>
						</Link>
					</TableCell>
				</TableRow>
			);
		} else {
			return (
				<TableRow key="wishlist-insert">
					<TableCell>
						<TextField name="name"></TextField>
					</TableCell>
					<TableCell></TableCell>
					<TableCell>
						<Checkbox name="primary" checked={this.state.primary_checked} onChange={this.togglePrimary}/>
					</TableCell>
					<TableCell className={classes.root}>
						<Button variant="contained" onClick={this.add.bind(this)}>Add</Button>
					</TableCell>
				</TableRow>
			)
		}
	}

	async add(e) {
		let row           = e.target.closest(".MuiTableRow-root");
		let name_input    = row.querySelector("input[name=name]");
		let primary_input = row.querySelector("input[name=primary]");
		let data          = {
			name    : name_input.value,
			primary : primary_input.checked,
			user_id : this.props.user_id
		};

		if (!data.name) {
			alert("Enter a wish list name.");
			return;
		}

		await this.props.addWishlist(data);

		name_input.value = "";
		
		if (primary_input.checked) {
			this.togglePrimary();
		}
	}

	makePrimary(wishlist, e) {
		wishlist.primary = e.target.checked;

		this.togglePrimary();
		this.props.updateWishlist(wishlist);
	}

	delete(wishlist) {
		this.props.deleteWishlist(wishlist.id);
	}
}

export default withStyles(useStyles)(WishlistRow);