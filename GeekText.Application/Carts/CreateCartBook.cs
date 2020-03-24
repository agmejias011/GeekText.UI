using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class CreateCartBook
    {
        private DbContextApplication context;

        public CreateCartBook(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(Cart cart, Book book, int ordered_qty, decimal book_price)
        {
            Cart_Book_Line newCartBook = new Cart_Book_Line();
            newCartBook.cart = cart;
            newCartBook.book = book;
            newCartBook.ordered_qty = ordered_qty;
            newCartBook.book_price = book_price;

            this.context.Cart_Book_Line.Add(newCartBook);
            context.SaveChanges();
        }
    }
}
