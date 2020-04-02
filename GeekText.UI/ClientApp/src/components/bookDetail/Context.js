import React, { Component } from "react";
import axios from 'axios';

const BookContext = React.createContext();
//Provider
//Consumer
class BookProvider extends Component
{

    state = {
        books: [],
        bookDetail: [],
        booksOfAuthor: [],
        
    };

    async componentDidMount() {
        this.populateBooksData();
    }
    populateBooksData =() => {
        axios.get("http://localhost:5000/api/books/GetBooks").then(response => {
            console.log(response.data);
            this.setState({
                books: response.data
            })
        })
    } 

    getItem = id => {
        const book = this.state.books.find(item => item.id === id);
        return book;
    }



    populateBooksofAuthorData = id => {
        let x = id;
        console.log(id);
        const url = "http://localhost:5000/api/authors/booksOfAuthor/" + x;
        axios.get(url).then(response => {
            const book = response.data;
            console.log(book)
            this.setState(() => {
                return { booksOfAuthor: book }
            })

        })
    } 

   
   
    handleDetail = id => {
        const book = this.getItem(id);
        this.setState(() => {
            return { bookDetail: book}
        })
    }

    handleBooksFromAuthor = () => {
      
    }


    render() {
        return (

            <BookContext.Provider
                value={{
                   ...this.state,
                    handleDetail: this.handleDetail,
                    handleBooksFromAuthor: this.handleBooksFromAuthor,
                    populateBooksofAuthorData: this.populateBooksofAuthorData
                }}
            >
                {this.props.children}
            </BookContext.Provider>
        );
    }
}

const BookConsumer = BookContext.Consumer;

export { BookProvider, BookConsumer };