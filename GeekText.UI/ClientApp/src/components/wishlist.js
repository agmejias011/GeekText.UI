import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import WishlistBookRow from "./wishlists/wishlist-book-row";

const API_URL = process.env.REACT_APP_API_URL;

class Wishlist extends React.Component {
	constructor(props) {
		super(props);

		let id = this.props.match.params.id;

		this.state = {
			id        : id,
			books     : [],
			wishlist  : {
				wishlist_books : []
			},
			wishlists : []
		};

		console.log(this.state);
	}

	async componentWillMount() {
		await this.loadWishlist();
		await this.loadWishlists();
	}

	render() {
		let empty_row = null;

		if (this.state.wishlist.wishlist_books.length === 0) {
			empty_row = (
				<TableRow key="no-books">
					<TableCell>No books on this wishlist.</TableCell>
					<TableCell></TableCell>
				</TableRow>
			);
		}

		return (
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Book</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{this.state.wishlist.wishlist_books.map(book => (
						<WishlistBookRow
							book={book}
							current_wishlist_id={this.state.wishlist.id}
							wishlists={this.state.wishlists}
							key={"book-row-" + book.id}
							deleteBook={this.deleteBook.bind(this)}
							updateBook={this.updateBook.bind(this)}/>
					))}
					{empty_row}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}

	async loadWishlist() {
		let wishlist = await fetch(`${API_URL}/Wishlists/${this.state.id}`);

		wishlist = await wishlist.json();

		console.log(wishlist);

		this.setState({
			wishlist : wishlist
		})
	}

	async loadWishlists() {
		let user = await fetch(`${API_URL}/User/${this.props.state.user.id}`);

		user = await user.json();

		let wishlists = user.wishlists;

		wishlists.sort((a, b) => {
			return (a.name < b.name) ? -1 : 1;
		});

		this.setState({
			wishlists : wishlists
		});
	}

	async updateBook(data) {
		let res = await fetch(
			`${API_URL}/WishlistBooks/${data.id}`,
			{
				method  : "PUT",
				headers : {
					"Content-Type" : "application/json"
				},
				body : JSON.stringify(data)
			}
		);

		try {
			res = await res.json();
			
			if (res.error) {
				alert(res.message);
			}
		} catch {}

		await this.loadWishlist();
	}

	async deleteBook(id) {
		let res = await fetch(
			`${API_URL}/WishlistBooks/${id}`,
			{
				method : "DELETE"
			}
		);

		try {
			res = await res.json();
			
			if (res.error) {
				alert(res.message);
			}
		} catch {}

		await this.loadWishlist();
	}
}

const mapStateToProps = (state) => {
	return {
		state : state
	};
}

export default connect(mapStateToProps)(withRouter(Wishlist));