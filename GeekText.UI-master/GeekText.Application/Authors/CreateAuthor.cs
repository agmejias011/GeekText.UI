using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Authors
{
    class CreateAuthor
    {
        private DbContextApplication context;
        public CreateAuthor(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(int id, string name, string bio, string photograph_url)
        {
            Author newAuthor = new Author();
            newAuthor.author_id = id;
            newAuthor.firstName = name;
            newAuthor.bio = bio;
            newAuthor.photograph_url = photograph_url;

            this.context.Authors.Add(newAuthor);
            context.SaveChanges();
        }
    }
}
