using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class GetCart
    {
        private DbContextApplication context;

        public GetCart(DbContextApplication context)
        {
            this.context = context;
        }

        public Cart Get(int id)
        {
            return context.Carts.Find(id);
        }
    }
}
