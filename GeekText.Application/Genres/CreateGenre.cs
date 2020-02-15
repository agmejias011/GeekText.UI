using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Genres
{
    class CreateGenre
    {
        private DbContextApplication context;
        public CreateGenre(DbContextApplication context)
        {
            this.context = context;
        }

        public void Create(int id, string name)
        {
            Genre newGenre = new Genre();
            newGenre.genre_id = id;
            newGenre.name = name;

            this.context.Genres.Add(newGenre);
            context.SaveChanges();
        }
    }
}
