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
                       isbn = "B017V4NQGM",
                       title = "Harry Potter",
                       description = "the Goblet of Fire, Book 4",
                       price = 25.0,
                       rating = 5,
                       img_url ="https://kbimages1-a.akamaihd.net/74b5c21d-35e1-4b25-bd97-010d3afc885a/1200/1200/False/harry-potter-and-the-goblet-of-fire-6.jpg",
                       date = new DateTime(1903,1,1),
                       top_seller = true,
                       featured = true,
                       Book_Genres = new List<Book_Genre>()
                       {
                         new Book_Genre { genre = new Genre() { name = "Drama"}},
                         new Book_Genre { genre = new Genre() { name = "Adventure"}}
                       },
                    },
                    author = new Author()
                    {
                        firstName = "Joanne",
                        lastName = "Rowling",

                    }
                },
                new Book_Author()
                {
                    book = new Book()
                    {
                        isbn = "B017VQGM",
                        title = "The Wither",
                        description = "Monster Hunter",
                        price = 30.0,
                        rating = 5,
                        img_url ="https://images-na.ssl-images-amazon.com/images/I/51KE3si0qKL.jpg",
                        date = new DateTime(1903,1,1),
                        top_seller = true,
                        featured = true,
                        Book_Genres = new List<Book_Genre>()
                        {
                         new Book_Genre { genre = new Genre() { name = "Fiction"}},
                         new Book_Genre { genre = new Genre() { name = "Mystery"}}
                        },
                    },
                    author = new Author()
                    {
                        firstName = " Andrzej ",
                        lastName = "Sapkowski",
                    }

                },

                new Book_Author()
                {
                    book= new Book()
                    {
                       isbn = "17VQFDSF23",
                       title = "The Call Of The Wild",
                       description = "",
                       price = 45.0,
                       rating = 5,
                       img_url ="https://www.gstatic.com/tv/thumb/v22vodart/16926237/p16926237_v_v8_ab.jpg",
                       date = new DateTime(1903,1,1),
                       top_seller = true,
                       featured = true,
                       Book_Genres = new List<Book_Genre>()
                       {
                         new Book_Genre { genre = new Genre() { name = "Adventure"}},
                         new Book_Genre { genre = new Genre() { name = "Fantasy"}}
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
                    book= new Book()
                    {
                       isbn = "17VQFDSF23",
                       title = "The Count of Monte Cristo",
                       description = "",
                       price = 10.0,
                       rating = 4.6,
                       img_url ="https://images-na.ssl-images-amazon.com/images/I/51uSVURMnVL._SX306_BO1,204,203,200_.jpg",
                       date = new DateTime(1903,1,1),
                       top_seller = true,
                       featured = true,
                       Book_Genres = new List<Book_Genre>()
                       {
                         new Book_Genre { genre = new Genre() { name = "Adventure"}},
                         new Book_Genre { genre = new Genre() { name = "Fantasy"}}
                       },
                    },
                    author = new Author()
                    {
                        firstName = "Alexandre ",
                        lastName = "Dumas",
                        
                    }
                },
            };
            context.Books_Authors.AddRange(booksAuthors);
            context.SaveChanges();
        }
    }
}
