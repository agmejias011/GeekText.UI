using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class CreateCart
    {
        private DbContextApplication context;
        public CreateCart(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(int id, decimal total_cost)
        {
            Cart newCart = new Cart();
            newCart.id = id;
            newCart.cart_total = total_cost;          
           
            this.context.Carts.Add(newCart);
            context.SaveChanges();
        }
    }
}
