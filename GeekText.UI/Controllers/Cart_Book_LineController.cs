using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GeekText.Database;
using GeekText.Domain.Models;

namespace GeekText.UI.Controllers
{
    [Route("api/cart-book-lines")]
    [ApiController]
    public class Cart_Book_LineController : ControllerBase
    {
        private readonly DbContextApplication _context;

        public Cart_Book_LineController(DbContextApplication context)
        {
            _context = context;
        }

        // GET: api/Cart_Book_Line
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart_Book_Line>>> GetCart_Book_Line()
        {
            return await _context.Cart_Book_Line.ToListAsync();
        }

        // GET: api/Cart_Book_Line/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart_Book_Line>> GetCart_Book_Line(int id)
        {
            var cart_Book_Line = await _context.Cart_Book_Line.FindAsync(id);

            if (cart_Book_Line == null)
            {
                return NotFound();
            }

            return cart_Book_Line;
        }

        // PUT: api/Cart_Book_Line/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart_Book_Line(int id, [FromBody]Cart_Book_Line cart_Book_Line)
        {
            if (id != cart_Book_Line.id)
            {
                return BadRequest();
            }

            _context.Entry(cart_Book_Line).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Cart_Book_LineExists(id))
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

        // POST: api/Cart_Book_Line
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("create")]
        public async Task<ActionResult<Cart_Book_Line>> PostCart_Book_Line([FromBody]Cart_Book_Line cart_Book_Line)
        {
            _context.Cart_Book_Line.Add(cart_Book_Line);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart_Book_Line", new { id = cart_Book_Line.id }, cart_Book_Line.id);
        }

        // DELETE: api/Cart_Book_Line/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Cart_Book_Line>> DeleteCart_Book_Line(int id)
        {
            var cart_Book_Line = await _context.Cart_Book_Line.FindAsync(id);
            if (cart_Book_Line == null)
            {
                return NotFound();
            }

            _context.Cart_Book_Line.Remove(cart_Book_Line);
            await _context.SaveChangesAsync();

            return cart_Book_Line;
        }

        private bool Cart_Book_LineExists(int id)
        {
            return _context.Cart_Book_Line.Any(e => e.id == id);
        }
    }
}
