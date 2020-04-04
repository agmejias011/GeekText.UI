using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class GetPaymentMethod
    {
        private DbContextApplication context;

        public GetPaymentMethod(DbContextApplication context)
        {
            this.context = context;
        }

        public Payment_Method Get(int id)
        {
            return context.Payment_methods.Find(id);
        }
    }
}
