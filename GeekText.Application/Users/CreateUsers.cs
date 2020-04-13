using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Books
{
    public class CreateUser
    {
        private DbContextApplication context;
        public CreateUser(DbContextApplication context)
        {
            this.context = context;
        }

       public void Create(int id, string username, string first_name, string last_name,
           string email, string user_password, string nickname, string home_address, string home_address2, string home_address3, int user_nickname)
        {
            User newUser = new User();
            newUser.id = id;
            newUser.username = username;
            newUser.first_name = first_name;
            newUser.last_name = last_name;
            newUser.email = email;
            newUser.user_password = user_password;
            newUser.nickname = nickname;
            newUser.home_address = home_address;
            newUser.home_address2 = home_address2;
            newUser.home_address3 = home_address3;
            newUser.user_nickname = user_nickname;

            this.context.Users.Add(newUser);
            context.SaveChanges();

        }
    }
}

