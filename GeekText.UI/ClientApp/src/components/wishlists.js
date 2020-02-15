import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import WishlistRow from "./wishlists/wishlist-row";

const API_URL = process.env.REACT_APP_API_URL;

class Wishlists extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			wishlists : []
		};
	}

	async componentWillMount() {
		await this.loadWishlists();
	}

	render() {
		return (
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell># of Books</TableCell>
							<TableCell>Primary</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<WishlistRow key="wishlist-row-insert" addWishlist={this.addWishlist.bind(this)}/>
						{this.state.wishlists.map(wishlist => (
							<WishlistRow
								wishlist={wishlist}
								key={"wishlist-row-" + wishlist.id}
								updateWishlist={this.updateWishlist.bind(this)}
								deleteWishlist={this.deleteWishlist.bind(this)}/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
	
	async addWishlist(data) {
		await fetch(
			`${API_URL}/Wishlists/`,
			{
				method  : "POST",
				headers : {
					"Content-Type" : "application/json"
				},
				body : JSON.stringify(data)
			}
		);
		await this.loadWishlists();
	}

	async updateWishlist(data) {
		await fetch(
			`${API_URL}/Wishlists/${data.id}`,
			{
				method  : "PUT",
				headers : {
					"Content-Type" : "application/json"
				},
				body : JSON.stringify(data)
			}
		);
		await this.loadWishlists();
	}

	async deleteWishlist(id) {
		await fetch(
			`${API_URL}/Wishlists/${id}`,
			{
				method : "DELETE"
			}
		);
		await this.loadWishlists();
	}

	async loadWishlists() {
		let wishlists = await fetch(`${API_URL}/Wishlists`);

		wishlists = await wishlists.json();

		wishlists.sort((a, b) => {
			if (a.primary) {
				return -1;
			}

			if (b.primary) {
				return 1;
			}

			return (a.name < b.name) ? -1 : 1;
		});

		this.setState({
			wishlists : wishlists
		})
	}
}

export default Wishlists;