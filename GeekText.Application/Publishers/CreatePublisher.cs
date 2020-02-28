using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Genres
{
    class CreatePublisher
    {
        private DbContextApplication context;
        public CreatePublisher(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(int id, string name, string description)
        {
            Publisher newPublisher = new Publisher();
            newPublisher.publisher_id = id;
            newPublisher.name = name;
            newPublisher.description = description;

            this.context.Publishers.Add(newPublisher);
            context.SaveChanges();

        }
    }
}
