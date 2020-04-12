import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Modal from "@material-ui/core/Modal";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import wishlist from "../wishlist";

const useStyles = theme => ({
	root : {
		"& > *" : {
			margin : theme.spacing(1)
		}
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2),
	},
});

class WishlistBookRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			moving_book : false,
			modal_open  : false
		};
	}

	render() {
		const { classes } = this.props;

		let book        = this.props.book;
		let wishlists   = this.props.wishlists;
		let move_button = null;

		if (wishlists.length > 1) {
			move_button = <Button variant="contained" onClick={this.openMoveModal.bind(this)}>Move</Button>;
		}

		return (
			<React.Fragment>
				<TableRow key={book.id} data-id={book.id}>
					<TableCell>{book.book.title}</TableCell>
					<TableCell className={classes.root}>
						{move_button}
						<Button variant="contained" onClick={this.delete.bind(this)}>Delete</Button>
						<Button variant="contained" onClick={this.viewDetail.bind(this, false)}>View</Button>
						<Button variant="contained" onClick={this.viewDetail.bind(this, true)}>Add to Cart</Button>
					</TableCell>
				</TableRow>
				<Modal open={this.state.modal_open} onClose={this.closeModal.bind(this)}>
					<div style={this.getModalStyle()} className={classes.paper}>
						<h2>Choose a Wishlist</h2>
						<List>
							{wishlists.map((wishlist) => {
								if (wishlist.id === this.props.current_wishlist_id) {
									return;
								}

								return (
									<React.Fragment key={"move-list-" + wishlist.id}>
										<ListItem button onClick={this.move.bind(this, wishlist.id)}>
											<ListItemText primary={wishlist.name} />
										</ListItem>
										<Divider/>
									</React.Fragment>
								);
							})}
						</List>
					</div>
				</Modal>
			</React.Fragment>
		);
	}

	viewDetail(add_to_cart) {
		localStorage.setItem("book", JSON.stringify(this.props.book.book));

		add_to_cart = (add_to_cart) ? "?add_to_cart=1" : "";
		
		window.location.href = `/details${add_to_cart}`;
	}

	delete() {
		this.props.deleteBook(this.props.book.id);
	}

	openMoveModal() {
		this.setState({
			moving_book : true,
			modal_open  : true
		});
	}

	move(wishlist_id) {
		let data = {
			id          : this.props.book.id,
			book_id     : this.props.book.book.id,
			wishlist_id : wishlist_id
		};

		this.props.updateBook(data);
	}

	closeModal() {
		this.setState({
			modal_open : false
		});
	}

	getModalStyle() {
		const top  = 50;
		const left = 50;
		
		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
		};
	}
}

export default withStyles(useStyles)(WishlistBookRow);