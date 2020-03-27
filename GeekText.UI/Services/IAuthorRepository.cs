using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekText.UI.Services
{
    public interface IAuthorRepository
    {
        ICollection<Author> GetAuthors();
        Author GetAuthor(int authorId);
        ICollection<Author> GetAuthorsOfBook(int bookId);
        ICollection<Book> GetBooksOfAuthor(int authorId);
        bool AuthorExists(int authorId);
      
    }
}
