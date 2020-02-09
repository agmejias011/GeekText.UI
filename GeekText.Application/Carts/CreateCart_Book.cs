using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class CreateCart_Book
    {
        private DbContextApplication context;

        public CreateCart_Book(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(Cart cart, Book book)
        {
            Cart_Book newCartBook = new Cart_Book();
            newCartBook.cart = cart;
            newCartBook.book = book;
            
            this.context.Cart_Books.Add(newCartBook);
            context.SaveChanges();
        }
    }
}
