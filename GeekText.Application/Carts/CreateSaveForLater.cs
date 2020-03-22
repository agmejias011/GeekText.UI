using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    class CreateSaveForLater
    {
        private DbContextApplication context;
        public CreateSaveForLater(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(ICollection<Book> books, User user, int saved_qty)
        {
            Saved_for_Later savedForLater = new Saved_for_Later();
            savedForLater.books = books;
            savedForLater.user = user;
            savedForLater.saved_qty = saved_qty;


            this.context.Saved_for_Later.Add(savedForLater);
            context.SaveChanges();
        }
    }
}
