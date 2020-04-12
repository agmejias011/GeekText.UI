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
                       title = "Harry Potter and the Goblet of Fire",
                       author = "Joanne Rowling",
                       bio = "J.K. Rowling is the author of the record-breaking, multi-award-winning Harry Potter novels.",
                       genre = "Fantasy",
                       description = "There will be three tasks, spaced throughout the school year, and they will test the champions in many different ways ... " +
                       "their magical prowess - their daring - their powers of deduction - and, of course, their ability to cope with danger.The Triwizard Tournament is to be held at Hogwarts. " +
                       "Only wizards who are over seventeen are allowed to enter - but that doesn't stop Harry dreaming that he will win the competition. Then at Hallowe'en, when the Goblet of Fire makes its selection, " +
                       "Harry is amazed to find his name is one of those that the magical cup picks out. He will face death-defying tasks, dragons and Dark wizards, but with the help of his best friends, Ron and Hermione, " +
                       "he might just make it through - alive!",
                       price = 44.99,
                       rating = 4.8,
                       img_url ="https://kbimages1-a.akamaihd.net/74b5c21d-35e1-4b25-bd97-010d3afc885a/1200/1200/False/harry-potter-and-the-goblet-of-fire-6.jpg",
                       publisher = "Pottermore Publishing",
                       date = new DateTime(1903,1,1),
                       Book_Genres = new List<Book_Genre>()
                       {
                         new Book_Genre { genre = new Genre() { name = "Adventure"}},

                       },
                    },

                    author = new Author()
                    {
                        firstName = "Joanne",
                        lastName = "Rowling",

                        Books_Author = new List<Book_Author>()
                        {
                              new Book_Author
                              {
                                  book = new Book()
                                  {
                                       isbn = "17VQBBFDSFS",
                                       title = "Harry Potter and the Sorcerer's Stone ",
                                       author = "Joanne Rowling",
                                       bio ="J.K. Rowling is the author of the record-breaking, multi-award-winning Harry Potter novels.",
                                       genre = "Fantasy",
                                       description = "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry.",
                                       price = 10.99,
                                       rating = 3,
                                       img_url ="https://m.media-amazon.com/images/I/41lnLrvBnML.jpg",
                                       publisher = "Bloomsbury (UK)",
                                       date = new DateTime(1997,2,1),
                                  }
                              },
                              new Book_Author
                              {
                                  book = new Book()
                                  {
                                       isbn = "17VPPFFDSFS",
                                       title = "Harry Potter and the Chamber of Secrets",
                                       author = "Joanne Rowling",
                                       bio = "J.K. Rowling is the author of the record-breaking, multi-award-winning Harry Potter novels.",
                                       genre = "Adventure",
                                       description = "Harry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors - and then the attacks start. Students are found as though turned to stone... Dobby's sinister predictions seem to be coming true.",
                                       price = 8.99,
                                       rating = 4.5,
                                       img_url ="https://m.media-amazon.com/images/I/51OZerWcGCL.jpg",
                                       publisher = "Bloomsbury (UK)",
                                       date = new DateTime(1998,1,1),
                                  }
                              },

                        },


                    }
                },
                new Book_Author()
                {
                    book = new Book()
                    {
                        isbn = "B017VQGM",
                        title = "The Witcher",
                        author = " Andrzej Sapkowski",
                        bio = "Andrzej Sapkowski born 21 June 1948) is a Polish fantasy writer and former economist. He is best known for his best-selling book series The Witcher.",
                        genre = "Fiction",
                        description = "Now a Netflix original series!The Witcher, Geralt of Rivia, becomes the guardian of Ciri, surviving heiress of a bloody revolution and prophesied savior of " +
                        "the world, in the first novel of the New York Times bestselling series that inspired the Netflix series and the blockbuster video games. " +
                        "For over a century, humans, dwarves, gnomes, and elves have lived together in relative peace. But times have changed, the uneasy peace is over, and now the races are fighting once again. The only good elf, it seems, is a dead elf." +
                        "Geralt of Rivia, the cunning assassin known as the Witcher, has been waiting for the birth of a prophesied child.This child has the power to change the world-- for good, or for evil." +
                        "As the threat of war hangs over the land and the child is hunted for her extraordinary powers, it will become Geralt's responsibility to protect them all.",
                        price = 30.5,
                        rating = 5,
                        img_url ="https://images-na.ssl-images-amazon.com/images/I/51KE3si0qKL.jpg",
                        publisher = "Orbit; Translation edition (October 3, 2017)",
                        date = new DateTime(1903,1,1),
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
                       author = "Jack London",
                       bio = "John Griffith Jack London (born John Griffith Chaney, January 12, 1876 - November 22, 1916) was an American novelist, journalist, and social activist.",
                       genre ="Drama",
                       description = "The illustrations for this series were created by Scott McKowen, who, with his wife Christina Poddubiuk, operates Punch & Judy Inc., " +
                       "a company specializing in design and illustration for " +
                       "theater and performing arts. Their projects often involve research into the visual" +
                       " aspects of historical settings and characters. Christina is a theater set and costume designer and contributed advice on the period clothing for the illustrations.",
                       price = 43,
                       rating = 5,
                       img_url ="https://www.gstatic.com/tv/thumb/v22vodart/16926237/p16926237_v_v8_ab.jpg",
                        publisher = "Macmillan Inc",
                       date = new DateTime(1903,1,1),
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
                       author = "Alexandre Dumas",
                       bio ="Alexandre Dumas, born Dumas Davy de la Pailleterie 24 July 1802 - 5 December 1870), also known as Alexandre Dumas, was a French writer. His works have been translated into nearly 100 languages, and he is one of the most widely read French authors.",
                       genre = "Fantasy",
                       description = "A classic tale of injustice, revenge and retribution, in which Edmond Dantes is falsely accused by three men of conspiring with Napoleon. Richard Chamberlain stars in this " +
                       "definitive adaptation of Alexandre Dumas' perennial favourite novel.",
                       price = 40.5,
                       rating = 4.6,
                       img_url ="https://images-na.ssl-images-amazon.com/images/I/51uSVURMnVL._SX306_BO1,204,203,200_.jpg",
                       publisher = "Penguin Classics",
                       date = new DateTime(1903,1,1),
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

                        Books_Author = new List<Book_Author>()
                        {
                              new Book_Author
                              {
                                  book = new Book()
                                  {
                                       isbn = "17VQFFDSFS",
                                       title = "The Three Musketeers",
                                       author = "Alexandre Dumas",
                                       genre = "Fantasy",
                                       bio = "Alexandre Dumas, born Dumas Davy de la Pailleterie 24 July 1802 - 5 December 1870), also known as Alexandre Dumas, was a French writer. His works have been translated into nearly 100 languages, and he is one of the most widely read French authors.",
                                       description = "One of the most celebrated and popular historical romances ever written, " +
                                       "The Three Musketeers tell the story of the early adventures of the young Gascon gentleman" +
                                       " d’Artagnan and his three friends from the regiment of the King’s Musketeers: Athos, Porthos, and Aramis.",
                                       price = 6.99,
                                       rating = 4.5,
                                       img_url ="https://m.media-amazon.com/images/I/51VvxTLUHkL.jpg",
                                       publisher = "Oxford University Press",
                                       date = new DateTime(1844,1,1),
                                  }
                              }
                        },
                    }
                 },

            };
            context.Books_Authors.AddRange(booksAuthors);
            context.SaveChanges();

            var users = new List<User>()
            {
                new User()
                {
                   username = "ag2020",
                   first_name = "Andres",
                   last_name = "Gonzalez",
                   email = "ag2020@fiu.edu",
                   user_password = "ag2020",
                   nickname = "ag2020",
                   home_address = "2580 W 24 ST",
                   user_nickname = 0

                },

                new User()
                {
                   username = "MJ2020",
                   first_name = "John",
                   last_name = "Miller",
                   email = "mj2020@fiu.edu",
                   user_password = "mj2020",
                   nickname = "mj2020",
                   home_address = "1500 W 12 ST",
                   user_nickname = 0

                }
            };

            context.Users.AddRange(users);
            context.SaveChanges();
           
            
            var paymentMethods = new List<Payment_Method>()
            {
                new Payment_Method()
                {
                    card_nickname = "Visa 1568",
                    card_number = "2563459876321568",
                    expiration = "05/25",
                    cvv = 123
                },
                 new Payment_Method()
                {
                    card_nickname = "Discovery 6325",
                    card_number = "1236589678546325",
                    expiration = "02/23",
                    cvv = 123
                }
            };

            context.Payment_methods.AddRange(paymentMethods);
            context.SaveChanges();

            var user_payment = new List<user_payment_options>()
            {
                new user_payment_options()
                {
                    user = users[0],
                    payment_method = paymentMethods[0]

                },
                  new user_payment_options()
                {
                    user = users[1],
                    payment_method = paymentMethods[1]

                }
            };

            context.user_payment_options.AddRange(user_payment);
            context.SaveChanges();

        }


    }
}
