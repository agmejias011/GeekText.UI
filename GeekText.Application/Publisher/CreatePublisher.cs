using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Publisher
{
    class CreatePublisher
    {
        private DbContextApplication context;
        public CreatePublisher(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(int id, string name, string bio, string photograph_url)
        {
            

            
            context.SaveChanges();
        }
    }
}

