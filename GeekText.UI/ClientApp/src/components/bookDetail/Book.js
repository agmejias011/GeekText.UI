import React, { Component } from 'react';
import { BookConsumer } from './Context'
import BookCard  from './BookCard'
import { Link } from "react-router-dom";


export default class Book extends Component{
   
    render() {
        console.log('hello, I am Book');
        const { id, title, author, publisher, price, rating, description, img_url } = this.props.book;

        return (<BookConsumer>
            {value => {
                return (
                    <div className="img-container"

                        onClick={() => value.handleDetail(id)}
                    
                    >
                        <Link to="/details" style={{ textDecoration: 'none' }}>
                            <BookCard
                                id={id}
                                title={title}
                                author={author}
                                rating={rating}
                                price={price}
                                img_url={img_url}
                            />
                        </Link>

                    </div>
                );
            }}
        </BookConsumer>);
                    
    
    }
    
 }
    
    
