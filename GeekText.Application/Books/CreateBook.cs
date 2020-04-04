using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Books
{
    public class CreateBook
    {
        private DbContextApplication context;
        public CreateBook(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(int id, string title, string description, double price)
        {
            Book newBook = new Book();
            newBook.id = id;
            newBook.title = title;
           // newBook.description = description;
           // newBook.price = price;

            this.context.Books.Add(newBook);
            context.SaveChanges();

        }
    }
}
