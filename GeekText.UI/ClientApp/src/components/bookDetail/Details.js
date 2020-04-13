import React from "react";
import { connect } from "react-redux";
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
import Comments from "./Comments"
import BookCard from './BookCard'

const API_URL = process.env.REACT_APP_API_URL;


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

  async addToWishlist(id) {
    if (!this.props.state.authenticated) {
      return false;
    }

    let data = {
      book_id     : id,
      wishlist_id : this.props.state.user.id
    };
    let res  = await fetch(
      `${API_URL}/WishlistBooks/`,
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
  }

  componentDidMount() {
    if (window.location.search === "?add_to_cart=1") {
      window.$(document).find("#add-to-cart").trigger("click");
    }
  }

  render() {
    return (
      <BookConsumer>
        {(value) => {
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
          } = value.bookDetail;

          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto col-md-4 my-2">
                  <Zoom>
                    <img
                      className="img-fluid"
                      alt="Responsive image"
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
                      <div
                         onClick={() => value.populateBooksofAuthorData(id)}
                      >
                          <strong>by:</strong> <Link to="/BooksOfAuthor">{author}</Link>
                          <h5 className="text-capitalize font-weight-bold mt-2 mb-0">
                             Biography:
                          </h5>
                          <strong>
                              <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                                  <p className="text-muted lead">
                                     {bio}
                                  </p>
                              </ReactTextCollapse>
                          </strong>
                      </div>
                    
                    </div>
                  </h5>
                  <h5 className="text-blue mt-4 mb-0">
                  <div><strong> Publisher:</strong> {publisher}</div>
                  </h5>
                  <h5 className="text-blue mt-3 mb-0">
                  <div> <strong> Genre: </strong> {genre} </div>
                  </h5>
                  <h5 className="text-blue mt-3 mb-0">
                   <div><strong> price: $</strong>{price}</div>
                  </h5>

                  <h5 className="font-weight-bold mt-3 mb-0">
                    Book Description:
                  </h5>
                  <p className="text-muted lead mt-1 mb-0">{description}</p>
                  
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                  ></Typography>
                  
                  <div className="mt-2 mb-0">
                    <Rating
                      name="size-large"
                      defaultValue={rating}
                      precision={0.5}
                      readOnly
                      size="large"
                    />
                   </div>
                 
                  <CartConsumer>
                    {(value) => {
                      return (
                      <React.Fragment>                                            
                          <Button
                            id="add-to-cart"
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
                              marginLeft: "10px"
                            }}
                            onClick={this.addToWishlist.bind(this, id)}
                          >
                            Add to Wishlist
                          </Button>
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
                                      marginLeft: "10px"
                                  }}

                              >
                                  <Link to="/Comments" style={{ textDecoration: 'none' }}> Comments/Ratings</Link>

                              </Button>

                        </React.Fragment>
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

const mapStateToProps = (state) => {
	return {
		state : state
	};
}

export default connect(mapStateToProps)(Details);

const TEXT_COLLAPSE_OPTIONS = {
    collapse: false, // default state when component rendered
    collapseText: '(...)', // text to show when collapsed
    expandText: '(Hide)', // text to show when expanded
    minHeight: 0, // component height when closed
    maxHeight: 60, // expanded to
    textStyle: { // pass the css for the collapseText and expandText here
        color: "black",
        fontSize: "16px"
    }
}