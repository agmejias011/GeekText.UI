import React from "react";
import { connect } from "react-redux";
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
		let insert_row = (this.state.wishlists.length === 3)
			? null
			: <WishlistRow key="wishlist-row-insert" addWishlist={this.addWishlist.bind(this)} user_id={this.props.state.user.id}/>;

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
						{insert_row}
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
		let res = await fetch(
			`${API_URL}/Wishlists/`,
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
			
			if (res.error) {
				alert(res.message);
			}
		} catch {}

		await this.loadWishlists();
	}

	async updateWishlist(data) {
		let res = await fetch(
			`${API_URL}/Wishlists/${data.id}`,
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

		await this.loadWishlists();
	}

	async deleteWishlist(id) {
		let res = await fetch(
			`${API_URL}/Wishlists/${id}`,
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

		await this.loadWishlists();
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
}

const mapStateToProps = (state) => {
	return {
		state : state
	};
}

export default connect(mapStateToProps)(Wishlists);