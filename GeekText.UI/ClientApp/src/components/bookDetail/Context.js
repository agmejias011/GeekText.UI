import React, { Component, useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import { gg } from "./CommentData"


const BookContext = React.createContext();
//Provider
//Consumer
class BookProvider extends Component
{

    state = {
        comments:[],
        books: [],
        booksOfAuthor: [],
        bookDetail: JSON.parse(localStorage.getItem('book')),
    };
   
   

   async componentDidMount() {
       this.populateBooksData();
       this.populateComments();
       if (localStorage.getItem("bookA")) {
           this.setState({
               booksOfAuthor: JSON.parse(localStorage.getItem("bookA")),
           });
       }
    }

    

    getItem = id => {
        const book = this.state.books.find(item => item.id === id);
        return book;

    };
   

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(()=>{
            return { bookDetail: product }
        }, () => {
                localStorage.setItem('book', JSON.stringify(this.state.bookDetail))
        });
        
    };

    async populateComments(){
        
        this.setState(() => {
            console.log(gg);
            return { comments: gg }
            console.log(this.state.comments);
            
        });
 
    } 

     populateBooksofAuthorData = id => {
        const x = id;
        const url = "http://localhost:5000/api/authors/booksA/" + x;
        axios.get(url).then(response => {
            const bookA = response.data 
            this.setState(() => {
                return { booksOfAuthor: bookA }
            }, () => {
                     localStorage.setItem('bookA', JSON.stringify(this.state.booksOfAuthor))
            });
        })
    } 

    populateBooksData =() => {
        axios.get("http://localhost:5000/api/books/GetBooks").then(response => {
            this.setState({
                books: response.data
            })
        })
    } 

    render() {
        return (
            <BookContext.Provider
                value={{
                   ...this.state,
                    handleDetail: this.handleDetail,
                    populateBooksofAuthorData: this.populateBooksofAuthorData,
                    
                }}
            >
                {this.props.children}
            </BookContext.Provider>
        );
    }
}

const BookConsumer = BookContext.Consumer;

export { BookProvider, BookConsumer };