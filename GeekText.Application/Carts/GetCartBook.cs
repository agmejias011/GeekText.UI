using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class GetCartBook
    {
        private DbContextApplication context;

        public GetCartBook(DbContextApplication context)
        {
            this.context = context;
        }

        public Cart_Book_Line Get(Cart cart)
        {
            return context.Cart_Book_Line.Find(cart);
        }
    }
}
