using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class GetOrder
    {
        private DbContextApplication context;

        public GetOrder(DbContextApplication context)
        {
            this.context = context;
        }

        public Order Get(int id)
        {
            return context.Orders.Find(id);
        }
    }
}
