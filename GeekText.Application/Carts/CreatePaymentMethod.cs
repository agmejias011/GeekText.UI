using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class CreatePaymentMethod
    {
        private DbContextApplication context;
        public CreatePaymentMethod(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(int id, string card_nickname, string card_number, string expiration, int cvv)
        {
            Payment_Method newPaymentMethod = new Payment_Method();
            newPaymentMethod.id = id;
            newPaymentMethod.card_nickname = card_nickname;
            newPaymentMethod.card_number = card_number;
            newPaymentMethod.expiration = expiration;
            newPaymentMethod.cvv = cvv;

            this.context.Payment_methods.Add(newPaymentMethod);
            context.SaveChanges();
        }
    }
}
