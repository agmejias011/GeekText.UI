import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import BookCard from './BookCard'
class Books extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            books: [],
            loading: true
        }
    }

    async componentDidMount() {
        this.populateBooksData();
    }

    populateBooksData() {
        axios.get("http://localhost:5000/api/books/GetBooks").then(response => { 
            this.setState({
                books: response.data, loading: false
            });
        });  
    }

    renderAllBooksTable(books) {
        return (
            <div className="App">
                <Grid
                    container
                    spacing={10}
                    style={{ padding: '24px' }}
                >
                    {books.map(b =>
                        <Grid
                            key={b.id}
                            item
                            xs={12} sm={6} md={4} lg={4} xl={3}
                        >
                            <BookCard
                                key={b.id}
                                title={b.title}
                                rating={b.rating}
                                price={b.price}
                                description={b.description}
                                img_url={b.img_url}
                            />
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }

    render() {

        let content = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            this.renderAllBooksTable(this.state.books)
        )

        return (
            <div>
                <h3> All Books</h3>
                <p> Here you can see all books</p>
                {content}
            </div>
          
        );
    }

}

export default Books