using GeekText.UI.Dto;
using GeekText.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekText.UI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BooksController :ControllerBase
    {
        private IBookRepository _bookRepository;

        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        //GET ALL Books
        //api/books
        [HttpGet("[action]")]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(IEnumerable<BookDto>))]
        public IActionResult GetBooks()
        {
            var books = _bookRepository.GetBooks();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booksDto = new List<BookDto>();
            foreach (var book in books)
            {
                booksDto.Add(new BookDto
                {
                    id = book.id,
                    title = book.title,
                    author = book.author,
                    bio = book.bio,
                    genre = book.genre,
                    price = book.price,
                    isbn = book.isbn,
                    description = book.description,
                    rating = book.rating,
                    img_url = book.img_url,
                    publisher = book.publisher,
                    date = book.date,
                });
            }
            return Ok(booksDto);
        }

        //GET SPECIFIC Book
        //api/Books/BookId
        [HttpGet("{bookId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(BookDto))]
        public IActionResult GetBook(int bookId)
        {
            if (!_bookRepository.BookExists(bookId))
                return NotFound();

            var book = _bookRepository.GetBook(bookId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var bookDto = new BookDto()
            {
                id = book.id,
                title = book.title,
                author = book.author,
                bio = book.bio,
                genre = book.genre,
                price = book.price,
                isbn = book.isbn,
                description = book.description,
                rating = book.rating,
                img_url = book.img_url,
                publisher = book.publisher,
                date = book.date,

            };
            return Ok(bookDto);
        }
    }
}
