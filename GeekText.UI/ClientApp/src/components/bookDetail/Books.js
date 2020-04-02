import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Book from './Book'
import Button from '@material-ui/core/Button';
import { BookConsumer} from './Context'

class Books extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <Grid
                        container
                        spacing={10}
                        style={{ padding: '24px' }}
                    > 
                        <BookConsumer>{value => {
                            return value.books.map(book => {
                                return (
                                    <Grid
                                        key={book.id}
                                        item
                                        xs={12} sm={6} md={4} lg={4} xl={3}
                                    >
                                        <Book  book={book} />
                                    </Grid>
                                
                                );
                            
                              });
                        }}
                        </BookConsumer>               
                    </Grid>
                </div>
            </React.Fragment>
        );

    }
}
export default Books