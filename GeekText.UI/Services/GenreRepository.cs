using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekText.UI.Services
{
    public class GenreRepository : IGenreRepository
    {
        private DbContextApplication _genreContext;
        public GenreRepository(DbContextApplication genreContext)
        {
            _genreContext = genreContext;
        }
        
        public bool GenreExists(int genreId)
        {
            return _genreContext.Genres.Any(g => g.genre_id == genreId);
        }

        public ICollection<Book> GetBooksForGenre(int genreId)
        {
            return _genreContext.Books_Genres.Where(g => g.genre_id == genreId).Select(b=> b.book).ToList(); 

        }

        public Genre GetGenre(int genreId)
        {
            return _genreContext.Genres.Where(g => g.genre_id == genreId).FirstOrDefault();
        }

        public ICollection<Genre> GetGenres()
        {
            return _genreContext.Genres.OrderBy(g => g.name).ToList();
        }

        public ICollection<Genre> GetGenresForBook(int bookId)
        {
            return _genreContext.Books_Genres.Where(b => b.book_id == bookId).Select(g => g.genre).ToList();

        }


    }
}
