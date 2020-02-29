import React from "react";
import { Book } from "./Book";

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="heroImage">
          <h2>Coming Soon</h2>
        </div>
        <h2>Favorite Books!</h2>
        <div className="showcase">
          <Book
            title="Harry Potter and the Order of the Phoenix"
            img="https://images.bwbcovers.com/043/Harry-Potter-and-the-Order-of-the-Phoenix-Rowling-J-K-9780439358064.jpg"
            author="J. K. Rowling"
            price="$9.99"
            release="01/01/1999"
            rating={4}
          />
          <Book
            title="The Very Hungry Caterpillar"
            img="https://images.bwbcovers.com/039/The-Very-Hungry-Caterpillar-9780399226908.jpg"
            author="Eric Carle"
            price="$4.99"
            release="01/01/1999"
            rating={4}
          />
          <Book
            title="Holes"
            img="https://images.bwbcovers.com/044/Holes-9780440228592.jpg"
            author="Louis Sachar"
            price="$6.99"
            release="01/01/1999"
            rating={4}
          />
        </div>
      </React.Fragment>
    );
  }
}
