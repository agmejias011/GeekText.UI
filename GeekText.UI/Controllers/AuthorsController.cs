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
    public class AuthorsController : ControllerBase
    {

        private IAuthorRepository _authorRepository;
        private IBookRepository _bookRepository;

        public AuthorsController(IAuthorRepository authorRepository, IBookRepository bookRepository)
        {
            _authorRepository = authorRepository;
            _bookRepository = bookRepository;
        }

        //GET ALL author
        //api/authors
        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(IEnumerable<AuthorDto>))]
        public IActionResult GetAuthors()
        {
            var authors = _authorRepository.GetAuthors();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var authorDto = new List<AuthorDto>();
            foreach (var author in authors)
            {
                authorDto.Add(new AuthorDto
                {
                    author_id = author.author_id,
                    firstName = author.firstName,
                    lastName = author.lastName,
                    bio = author.bio,
                    photograph_url = author.photograph_url
                });
            }
            return Ok(authorDto);
        }

        //GET SPECIFIC Author
        //api/authors/authorId
        [HttpGet("{authorId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(AuthorDto))]
        public IActionResult GetAuthor(int authorId)
        {
            if (!_authorRepository.AuthorExists(authorId))
                return NotFound();

            var author = _authorRepository.GetAuthor(authorId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var authorDto = new AuthorDto()
            {
                author_id = author.author_id,
                firstName = author.firstName,
                lastName = author.lastName,
                bio = author.bio,
                photograph_url = author.photograph_url

            };
            return Ok(authorDto);
        }

        //GET ALL AUTHORS FOR BOOK
        //api/authors/books/bookId
        [HttpGet("books/{bookId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(IEnumerable<AuthorDto>))]
        public IActionResult GetAllAuthorsForBook(int bookId)
        {
            if (!_bookRepository.BookExists(bookId))
                return NotFound();

            var authors = _authorRepository.GetAuthorsOfBook(bookId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var authorsDto = new List<AuthorDto>();
            foreach (var author in authors)
            {
                authorsDto.Add(new AuthorDto()
                {
                    author_id = author.author_id,
                    firstName = author.firstName,
                    lastName = author.lastName,
                    bio = author.bio,
                    photograph_url = author.photograph_url
                });
            }
            return Ok(authorsDto);
        }

        // TO DO GetAllBooksForAuthor
        //api/authors/authorId/books
        [HttpGet("booksOfAuthor/{authorId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(IEnumerable<BookDto>))]
        public IActionResult GetBooksByAuthor(int authorId)
        {
            if (!_bookRepository.BookExists(authorId))
                return NotFound();
            var books = _authorRepository.GetBooksOfAuthor(authorId);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booksDto = new List<BookDto>();
            foreach (var book in books)
            {
                booksDto.Add(new BookDto()
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
                    date = book.date
                });
            }
            return Ok(booksDto);
        }


        //GET ALL BOOKS FROM AUTHOR Using BOOK ID
        //api/authors/books/bookId
        [HttpGet("booksA/{bookId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(IEnumerable<AuthorDto>))]
        public IActionResult GetBook(int bookId)
        {
            if (!_bookRepository.BookExists(bookId))
                return NotFound();

            var authors = _authorRepository.GetAuthorsOfBook(bookId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var booksDto = new List<BookDto>();
            foreach (var author in authors)
            {
                if (!_bookRepository.BookExists(author.author_id))
                    return NotFound();
                var books = _authorRepository.GetBooksOfAuthor(author.author_id);
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
              
                foreach (var book in books)
                {
                    booksDto.Add(new BookDto()
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
                        date = book.date
                    });
                    
                }
                
            }
            return Ok(booksDto);
        }

    }

}
