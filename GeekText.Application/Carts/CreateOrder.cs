using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class CreateOrder
    {
        private DbContextApplication context;
        public CreateOrder(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(int id, Payment_Method payment_method, User user, Cart cart)
        {
            Order newOrder = new Order();
            newOrder.id = id;
            newOrder.payment_method = payment_method;
            newOrder.user = user;
            newOrder.cart = cart;

            this.context.Orders.Add(newOrder);
            context.SaveChanges();
        }
    }
}
