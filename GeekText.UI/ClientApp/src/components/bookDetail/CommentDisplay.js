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
import Comments from "./Comments"
import BookCard from './BookCard'


export default class CommentDisplay extends React.Component {

    render() {
        console.log('hello, I am Books');
        return (
            <React.Fragment>
                <div className="App">
                    <div
                        container
                        spacing={10}
                        style={{ padding: '24px' }}
                    >
                        <BookConsumer>{value => {
                            return value.comments.map(book => {
                                return (
                                    <div key={book.id} >

                                        <Comments
                                            id={book.id}
                                            img={book.img}
                                            name={book.name}
                                            email={book.email}
                                            body={book.body}
                                        />
                                    </div>
                                );

                            });
                        }}
                        </BookConsumer>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}


