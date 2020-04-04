using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekText.UI.Services
{
    public class AuthorRepository : IAuthorRepository
    {
        private DbContextApplication _authorContext;
        public AuthorRepository(DbContextApplication authorContext)
        {
            _authorContext = authorContext;
        }
        public bool AuthorExists(int authorId)
        {
            return _authorContext.Authors.Any(a => a.author_id == authorId);
        }


        public Author GetAuthor(int authorId)
        {
            return _authorContext.Authors.Where(a => a.author_id == authorId).FirstOrDefault();
        }

        public ICollection<Author> GetAuthors()
        {
            return _authorContext.Authors.OrderBy(a => a.lastName).ToList();
        }

        public ICollection<Author> GetAuthorsOfBook(int bookId)
        {
            return _authorContext.Books_Authors.Where(b => b.book_id == bookId).Select(a => a.author).ToList();
        }

        public ICollection<Book> GetBooksOfAuthor(int authorId)
        {
            return _authorContext.Books_Authors.Where(a => a.author_id == authorId).Select(b => b.book).ToList();
        }
    }
}
