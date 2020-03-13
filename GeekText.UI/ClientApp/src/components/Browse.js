import React from "react";
import { books } from "../Books";
import { Book } from "./Book";

export default class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "title",
      data: books
    };
  }

  componentDidMount() {
    console.log("hello");
    // this.state.data.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  componentDidUpdate() {}

  handleSelectChange(event) {
    let sortType = event.target.value;
    this.setState({ value: sortType });
    console.log(`You are now sorting by: ${sortType}`);

    if (sortType === "title") {
      this.state.data.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (sortType === "rating") {
      this.state.data.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    } else if (sortType === "author") {
      this.state.data.sort((a, b) => (a.author > b.author ? 1 : -1));
    } else if (sortType === "price") {
      this.state.data.sort((a, b) => a.price - b.price);
    } else if (sortType === "date") {
      this.state.data.sort((a, b) => a.releaseDate - b.releaseDate);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="results">
          <h3>
            Results for "<i>The Giver</i>"
          </h3>
          <p>Currently sorting by {this.state.value}</p>
          <select
            id="sort"
            value={this.state.value}
            onChange={e => this.handleSelectChange(e)}
          >
            <option value="author">Author</option>
            <option value="title">Book Title</option>
            <option value="date">Release Date</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="browse">
          {this.state.data.map((book, index) => {
            return (
              <Book
                title={book.title}
                rating={book.rating}
                author={book.author}
                price={book.price}
                key={index}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
