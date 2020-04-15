import React from "react";
import { BookConsumer } from "./Context";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import CardActionArea from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Button from "@material-ui/core/Button";
import ReactDOM from "react-dom";
import siteContainer from "../site-container";
import { CartConsumer } from "../ShoppingCart/contextCart";
import ReactTextCollapse from "react-text-collapse";
import CommentAndRatingCard from "../CommentAndRatingCard";

const bookDetail = {
  id: "123cd",
  title: "The Little Prince",
  author: "Exupery",
  bio: "A great writer, also a pilot",
  publisher: "Gente Nueva",
  price: 12.34,
  rating: 4,
  description: "Great Book",
  img_url: "https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG",
  genre: "children's fantasy",
};

const user = {
  id: "12356njko",
  fullname: 'Andy',
  nickname: 'Gonzalez',
  purchases: [
    {
      userId: "asdf324",
      bookId: "123cd",
      reviewComment: "Great Book",
      rating: 5,
      signature: "fullname",
      reviewDate: new Date(),
    },
  ],
};
class Details extends React.Component {
  addToCartEvent = (
    id,
    title,
    author,
    publisher,
    price,
    rating,
    description,
    img_url,
    genre,
    value
  ) => {
    let booksStorage = [];
    let book = [];
    booksStorage = JSON.parse(localStorage.getItem("cartItems"));

    if (booksStorage) {
      book = booksStorage.filter((p) => p.id === id);

      if (book.length === 0) {
        //new book
        let booknew = {
          id: id,
          name: title,
          author: author,
          publisher: publisher,
          price: price,
          rating: rating,
          description: description,
          img_url: img_url,
          genre: genre,
          orderQTY: 1,
          itemSubtotal: price,
        };

        const booksNew = booksStorage.concat(booknew);
        localStorage.setItem("cartItems", JSON.stringify(booksNew));
      } else {
        // book was already added
        let updateBook = {
          id: book[0].id,
          name: book[0].name,
          author: book[0].author,
          publisher: book[0].publisher,
          price: book[0].price,
          rating: book[0].rating,
          description: book[0].description,
          img_url: book[0].img_url,
          genre: book[0].genre,
          orderQTY: book[0].orderQTY,
          itemSubtotal: book[0].itemSubtotal,
        };

        const books = [...booksStorage];
        const index = books.findIndex((item) => item.id === updateBook.id);
        books[index] = { ...updateBook };
        books[index].orderQTY++;
        books[index].itemSubtotal = books[index].price * books[index].orderQTY;

        localStorage.setItem("cartItems", JSON.stringify(books));
      }
    } else {
      let booknew = {
        id: id,
        name: title,
        author: author,
        publisher: publisher,
        price: price,
        rating: rating,
        description: description,
        img_url: img_url,
        genre: genre,
        orderQTY: 1,
        itemSubtotal: price,
      };

      let booksNew = [];
      booksNew = booksNew.concat(booknew);

      localStorage.setItem("cartItems", JSON.stringify(booksNew));
    }

    let cartItemsTotal = JSON.parse(localStorage.getItem("cartItemsTotal"));

    if (cartItemsTotal > 0) {
      cartItemsTotal++;
    } else {
      cartItemsTotal = 1;
    }

    localStorage.setItem("cartItemsTotal", JSON.stringify(cartItemsTotal));

    value.updateCartItemTotal(cartItemsTotal);
  };

  render() {
    return (
      <BookConsumer>
        {(value) => {
          // const {
          //   id,
          //   title,
          //   author,
          //   bio,
          //   publisher,
          //   price,
          //   rating,
          //   description,
          //   img_url,
          //   genre,
          // } = value.bookDetail;

          const {
            id,
            title,
            author,
            bio,
            publisher,
            price,
            rating,
            description,
            img_url,
            genre,
          } = bookDetail;

          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto col-md-4 my-2">
                  <Zoom>
                    <img
                      className="img-fluid"
                      alt="Responsive"
                      src={img_url}
                      width="600"
                      height="800"
                    />
                  </Zoom>
                </div>

                {/* prdoduct info */}
                <div className="col-10 mx-auto col-md-8 my-2 text-capitalize">
                  <h1>{title}</h1>
                  <h5 className="text-title  mt-3 mb-2">
                    <div className>
                      <div onClick={() => value.populateBooksofAuthorData(id)}>
                        <strong>by:</strong>{" "}
                        {/* <Link to="/BooksOfAuthor">{author}</Link> */}
                        <h5 className="text-capitalize font-weight-bold mt-2 mb-0">
                          Biography:
                        </h5>
                        <strong>
                          <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                            <p className="text-muted lead">{bio}</p>
                          </ReactTextCollapse>
                        </strong>
                      </div>
                    </div>
                  </h5>
                  <h5 className="text-blue mt-4 mb-0">
                    <div>
                      <strong> Publisher:</strong> {publisher}
                    </div>
                  </h5>
                  <h5 className="text-blue mt-3 mb-0">
                    <div>
                      {" "}
                      <strong> Genre: </strong> {genre}{" "}
                    </div>
                  </h5>
                  <h5 className="text-blue mt-3 mb-0">
                    <div>
                      <strong> price: $</strong>
                      {price}
                    </div>
                  </h5>

                  <h5 className="font-weight-bold mt-3 mb-0">
                    Book Description:
                  </h5>
                  <p className="text-muted lead mt-1 mb-0">{description}</p>

                  <CartConsumer>
                    {(value) => {
                      return (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          style={{
                            borderRadius: 0,
                            color: "#fff",
                            background: "#111",
                            height: "4em",
                            marginTop: "25px",
                          }}
                          onClick={() =>
                            this.addToCartEvent(
                              id,
                              title,
                              author,
                              publisher,
                              price,
                              rating,
                              description,
                              img_url,
                              genre,
                              value
                            )
                          }
                        >
                          Add to Cart
                        </Button>
                      );
                    }}
                  </CartConsumer>
                  <CommentAndRatingCard
                    user={user}
                    book={bookDetail}
                    onCardLike={() => {
                      alert("You like this book!");
                    }}
                  ></CommentAndRatingCard>
                </div>
              </div>
            </div>
          );
        }}
      </BookConsumer>
    );
  }
}
export default Details;

const TEXT_COLLAPSE_OPTIONS = {
  collapse: false, // default state when component rendered
  collapseText: "(...)", // text to show when collapsed
  expandText: "(Hide)", // text to show when expanded
  minHeight: 0, // component height when closed
  maxHeight: 60, // expanded to
  textStyle: {
    // pass the css for the collapseText and expandText here
    color: "black",
    fontSize: "16px",
  },
};
