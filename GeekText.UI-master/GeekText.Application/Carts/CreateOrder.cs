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

        public void Create(Payment_Method payment_method, User user)
        {
            Order newOrder = new Order();           
            newOrder.payment_method = payment_method;
            newOrder.user = user;
          
            this.context.Orders.Add(newOrder);
            context.SaveChanges();
        }
    }
}
