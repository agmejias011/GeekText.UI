using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekText.UI.Services
{
    public class BookRepository : IBookRepository
    {

        private DbContextApplication _bookContext;
        public BookRepository(DbContextApplication bookContext)
        {
            _bookContext = bookContext;
        }
        public bool BookExists(int bookId)
        {
            return _bookContext.Books.Any(b => b.id == bookId);
        }

        public bool BookExists(string bookIsbn)
        {
            return _bookContext.Books.Any(b => b.isbn == bookIsbn);
        }

        public ICollection<Book> GetBooks()
        {
            return _bookContext.Books.OrderBy(b => b.title).ToList();
        }

        public Book GetBook(int bookId)
        {
            return _bookContext.Books.Where(b => b.id == bookId).FirstOrDefault();
        }

        public Book GetBook(string bookIsbn)
        {
            return _bookContext.Books.Where(b => b.isbn == bookIsbn).FirstOrDefault();
        }

        public bool IsDuplicateIsbn(int bookId, string bookIsbn)
        {
            var book = _bookContext.Books.Where(b => b.isbn.Trim().ToUpper() == bookIsbn.Trim().ToUpper() && b.id != bookId);
            return book == null ? false : true;
        }
    }
}
