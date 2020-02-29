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

        public void Create(int id, int quantity_items, decimal total_cost, bool saved_for_later, User user)
        {
            Cart newCart = new Cart();
            newCart.id = id;
            newCart.quantity_items = quantity_items;
            newCart.total_cost = total_cost;
            newCart.user = user;

            this.context.Carts.Add(newCart);
            context.SaveChanges();
        }
    }
}
