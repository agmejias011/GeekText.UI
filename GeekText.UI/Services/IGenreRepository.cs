using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekText.UI.Services
{
    public interface IGenreRepository
    {
        ICollection<Genre> GetGenres();
        Genre GetGenre(int genreId);
        ICollection<Genre> GetGenresForBook(int bookId);
        ICollection<Book> GetBooksForGenre(int genreId);
        bool GenreExists(int genreId);
    }
}
