using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class GetPayment_Method
    {
        private DbContextApplication context;

        public GetPayment_Method(DbContextApplication context)
        {
            this.context = context;
        }

        public Payment_Method Get(int id)
        {
            return context.payment_methods.Find(id);
        }
    }
}
