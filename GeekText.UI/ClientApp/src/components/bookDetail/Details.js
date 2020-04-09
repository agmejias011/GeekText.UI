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
          const {
            id,
            title,
            author,
            publisher,
            price,
            rating,
            description,
            img_url,
            genre,
          } = value.bookDetail;

          return (
            <div className="container py-10">
              <div className="row">
                <div className="col-10 mx-auto col-md-4 my-3">
                  <Zoom>
                    <img
                      className="img-fluid"
                      alt="Responsive image"
                      src={img_url}
                      width="400"
                      height="600"
                    />
                  </Zoom>
                </div>

                {/* prdoduct info */}
                <div className="col-10 mx-auto col-md-7 my-3 text-capitalize">
                  <h1>{title}</h1>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    <div className="text-uppercase">
                      <div
                         onClick={() => value.populateBooksofAuthorData(id)}
                      >
                         by: <Link to="/BooksOfAuthor">{author}</Link>
                      </div>
                    </div>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      <div> Publisher: {publisher}</div>
                    </strong>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      <div> price :$ {price}</div>
                    </strong>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      <div> Genre: {genre} </div>
                    </strong>
                  </h4>

                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Book's Description :
                  </p>
                  <p className="text-muted lead">{description}</p>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                  ></Typography>
                  <Typography gutterBottom variant="h5" component="h5">
                    Rating:
                    <Rating
                      name="half-rating-read"
                      defaultValue={rating}
                      precision={0.5}
                      readOnly
                    />
                  </Typography>
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
