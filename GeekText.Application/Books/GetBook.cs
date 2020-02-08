using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Books
{
    public class GetBook
    {
        private DbContextApplication context;

        public GetBook(DbContextApplication context)
        {
            this.context = context;
        }

        public Book Get(int id)
        {
            return context.Books.Find(id);
        }

    }
}
