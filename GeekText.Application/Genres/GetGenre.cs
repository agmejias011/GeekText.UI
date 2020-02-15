using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Genres
{
    class GetGenre
    {
        private DbContextApplication context;

        public GetGenre(DbContextApplication context)
        {
            this.context = context;
        }

        public Genre Get(int id)
        {
            return context.Genres.Find(id);
        }
    }
}
