using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GeekText.Database;
using GeekText.Domain.Models;
using GeekText.UI.Controllers.MapperClasses;

namespace GeekText.UI.Controllers
{
    [Route("api/saved-books")]
    [ApiController]
    public class Saved_for_LaterController : ControllerBase
    {
        private readonly DbContextApplication _context;

        public Saved_for_LaterController(DbContextApplication context)
        {
            _context = context;
        }

        // GET: api/Saved_for_Later
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Saved_for_Later>>> GetSaved_for_Later()
        {
            return await _context.Saved_for_Later.ToListAsync();
        }

        // GET: api/Saved_for_Later/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Saved_for_Later>> GetSaved_for_Later(int id)
        {
            var saved_for_Later = await _context.Saved_for_Later.FindAsync(id);

            if (saved_for_Later == null)
            {
                return NotFound();
            }

            return saved_for_Later;
        }

        // PUT: api/Saved_for_Later/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaved_for_Later(int id, Saved_for_Later saved_for_Later)
        {
            if (id != saved_for_Later.id)
            {
                return BadRequest();
            }

            _context.Entry(saved_for_Later).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Saved_for_LaterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Saved_for_Later
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("create")]
        public async Task<ActionResult<Saved_for_Later>> PostSaved_for_Later([FromBody]SavedLaterJSON saved_for_Laterjson)
        {
            var contextBook = _context.Books.Where(b => b.id == saved_for_Laterjson.book_id);
            var contextUser = _context.Users.Where(u => u.id == saved_for_Laterjson.user_id);

            Saved_for_Later savedBooks = new Saved_for_Later();
            savedBooks.book = contextBook.FirstOrDefault<Book>();
            savedBooks.user = contextUser.FirstOrDefault<User>();
            savedBooks.saved_qty = saved_for_Laterjson.saved_qty;

            _context.Saved_for_Later.Add(savedBooks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSaved_for_Later", new { id = savedBooks.id }, savedBooks.id);
        }

        // DELETE: api/Saved_for_Later/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Saved_for_Later>> DeleteSaved_for_Later(int id)
        {
            var saved_for_Later = await _context.Saved_for_Later.FindAsync(id);
            if (saved_for_Later == null)
            {
                return NotFound();
            }

            _context.Saved_for_Later.Remove(saved_for_Later);
            await _context.SaveChangesAsync();

            return saved_for_Later;
        }

        private bool Saved_for_LaterExists(int id)
        {
            return _context.Saved_for_Later.Any(e => e.id == id);
        }
    }
}
