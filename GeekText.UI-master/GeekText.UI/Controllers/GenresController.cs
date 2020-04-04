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
    public class GenresController : ControllerBase
    {
        private IGenreRepository _genreRepository;
        private IBookRepository _bookRepository;

        public GenresController(IGenreRepository genreRepository, IBookRepository bookRepository)
        {
            _genreRepository = genreRepository;
            _bookRepository = bookRepository;
        }

        //GET ALL GENRE
        //api/genres
        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GenreDto>))]
        public IActionResult GetGenres()
        {
            var genres = _genreRepository.GetGenres();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var genresDto = new List<GenreDto>();
            foreach (var genre in genres)
            {
                genresDto.Add(new GenreDto
                {
                    genre_id = genre.genre_id, name = genre.name
                });
            }
            return Ok(genresDto);
        }

        //GET SPECIFIC GENRE
        //api/genres/genreId
        [HttpGet("{genreId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(GenreDto))]
        public IActionResult GetGenre(int genreId)
        {
            if (!_genreRepository.GenreExists(genreId))
                return NotFound();

            var genre = _genreRepository.GetGenre(genreId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var genreDto = new GenreDto()
            {
                genre_id = genre.genre_id,
                name = genre.name
            };
            return Ok(genreDto);
        }

        //GET ALL GENRES FOR A BOOK
        //api/genres/books/bookId
        [HttpGet("books/{bookId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(IEnumerable<GenreDto>))]
        public IActionResult GetAllGenresForBook(int bookId)
        {
            if (!_bookRepository.BookExists(bookId))
                return NotFound();

            var genres = _genreRepository.GetGenresForBook(bookId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var genresDto = new List<GenreDto>();

            foreach (var genre in genres)
            {
                genresDto.Add(new GenreDto()
                {
                    genre_id = genre.genre_id,
                    name = genre.name
                });
            }
            return Ok(genresDto);
        }

        // TO DO GetAllBooksForGenre
    }
}

