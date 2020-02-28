using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Carts
{
    public class CreatePayment_Method
    {
        private DbContextApplication context;
        public CreatePayment_Method(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(int id, string card_nickname, int card_number, string expiration, int cvv)
        {
            Payment_Method newPaymentMethod = new Payment_Method();
            newPaymentMethod.id = id;
            newPaymentMethod.card_nickname = card_nickname;
            newPaymentMethod.card_number = card_number;
            newPaymentMethod.expiration = expiration;
            newPaymentMethod.cvv = cvv;

            this.context.payment_methods.Add(newPaymentMethod);
            context.SaveChanges();
        }
    }
}
