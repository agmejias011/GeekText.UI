using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class GetCart_Book
    {
        private DbContextApplication context;

        public GetCart_Book(DbContextApplication context)
        {
            this.context = context;
        }

        public Cart_Book Get(Cart cart)
        {
            return context.Cart_Books.Find(cart);
        }
    }
}
