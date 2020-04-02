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
    [Route("api/save-books")]
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
        public async Task<ActionResult<List<ReturnSaveLaterforUI>>> GetSaved_for_Later(int id)//this is the user id
        {
            var contextSave = _context.Saved_for_Later.
               Include(u => u.user).
               Include(b => b.book).
               Where(p => p.user.id == id);

            if(contextSave.FirstOrDefault<Saved_for_Later>().book == null)
            {
                return NotFound();
            }
           
            List<ReturnSaveLaterforUI> savedBooksAll = new List<ReturnSaveLaterforUI>();

            foreach (var item in contextSave)
            {
                ReturnSaveLaterforUI savedBooksReturned = new ReturnSaveLaterforUI();             

                savedBooksReturned.books = await _context.Books.FindAsync(item.book.id);
                savedBooksReturned.qty = item.saved_qty;
                savedBooksAll.Add(savedBooksReturned);
            }  

            return savedBooksAll;
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
        [HttpPost ("create")]
        public async Task<ActionResult<int>> PostSaved_for_Later([FromBody]List<SavedBooksJSON> saved_for_LaterJSON)
        {            
            try
            {
                foreach (var item in saved_for_LaterJSON)
                {
                    Saved_for_Later saveforLater = new Saved_for_Later();
                    User user = new User();
                    user = _context.Users.Find(item.user_id);

                    Book book = new Book();
                    book = _context.Books.Find(item.book_id);

                    saveforLater.user = user;
                    saveforLater.book = book;
                    saveforLater.saved_qty = item.saved_qty;


                    _context.Saved_for_Later.Add(saveforLater);
                    await _context.SaveChangesAsync();                   
                }

                return 1;

            }
            catch
            {
                return 0;
            }
            
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
