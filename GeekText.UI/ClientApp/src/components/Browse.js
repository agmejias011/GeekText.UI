import React from "react";
import { books } from "../Books";
import { Book } from "./Book";

export default class Browse extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3>
          Results for "<i>The Giver</i>"
        </h3>
        <div className="browse">
          {books.map(book => {
            return (
              <Book
                title={book.title}
                author={book.author}
                price={book.price}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
