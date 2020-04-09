import React, { Component } from 'react';
import { BookConsumer } from './Context'
import BookCard from './BookCard'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';


export default class BooksOfAuthor extends Component {

    render() {
        return (
                <div className="App">
                    
                    <Grid
                        container
                        spacing={10}
                        style={{ padding: '24px' }}
                    >
                    <BookConsumer>{value => {
                        return value.booksOfAuthor.map(book => {
                                return (

                                    <Grid
                                        key={book.id}
                                        item
                                        xs={12} sm={6} md={4} lg={4} xl={3}
                                    >
                                        <BookCard
                                            id={book.id}
                                            title={book.title}
                                            author={book.author}
                                            publisher={book.publisher}
                                            rating={book.rating}
                                            price={book.price}
                                            img_url={book.img_url}
                                        />
                                    </Grid>
                                );

                            });
                        }}
                        </BookConsumer>
                    </Grid>
                </div>
        );

    }

}


