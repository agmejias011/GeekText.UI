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
        [HttpGet]
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
                 isbn = book.isbn,
                 //description = book.description,
                 //rating = book.rating,
                 //img_url = book.img_url,
                 //date = book.date,
                 //top_seller = book.top_seller,
                 //featured = book.featured
                });
            }
            return Ok(booksDto);
        }

    }
}
