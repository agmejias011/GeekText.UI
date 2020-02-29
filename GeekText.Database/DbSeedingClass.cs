using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Database
{
    public static class DbSeedingClass
    {
        public static void SeedDataContext(this DbContextApplication context)
{
           
            var booksAuthors = new List<Book_Author>()
{
                new Book_Author()
                {
                    book= new Book()
                    {
                       isbn = "1234",
                       title = "The Call Of The Wild",
                       date = new DateTime(1903,1,1),
                       Book_Genres = new List<Book_Genre>()
                       {
                         new Book_Genre { genre = new Genre() { name = "Educational"}},
                         new Book_Genre { genre = new Genre() { name = "Computer Programming"}}
                       },
                    },
                    author = new Author()
                    {
                        firstName = "Jack",
                        lastName = "London",
                       
                    }
},
                new Book_Author()
                {
                    book = new Book()
                    {
                        isbn = "1234",
                        title = "Winnetou",
                        date = new DateTime(1878,10,1),
                        Book_Genres = new List<Book_Genre>()
                        {
                         new Book_Genre { genre = new Genre() { name = "Adventure"}},
                         new Book_Genre { genre = new Genre() { name = "Horror"}}
                        },
                    },
                    author = new Author()
                    {
                        firstName = "Karl",
                        lastName = "May",
                    }

                },
//               
            };
            context.Books_Authors.AddRange(booksAuthors);
            context.SaveChanges();
        }
    }
}
