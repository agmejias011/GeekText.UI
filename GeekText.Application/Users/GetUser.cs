using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Users
{
    public class GetUser
    {
        private DbContextApplication context;

        public GetUser(DbContextApplication context)
        {
            this.context = context;
        }

        public User Get(int id)
        {
            return context.Users.Find(id);
        }
    }
}
