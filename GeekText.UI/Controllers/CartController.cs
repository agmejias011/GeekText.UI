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
    [Produces("application/json")]
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly DbContextApplication _context;

        public CartController(DbContextApplication context)
        {
            _context = context;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return await _context.Carts.Include(c => c.user).ToListAsync();
        }

        // GET: api/Cart/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);

            cart = _context.Carts.Include(c => c.user).FirstOrDefault(a => a.id == id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // PUT: api/Cart/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, [FromBody]Cart cart)
        {
            if (id != cart.id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(200);
        }

        // POST: api/Cart
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("create")]
        public async Task<ActionResult<Cart>> PostCart([FromBody]Cart cart)
        {
            try
            {
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }
            catch (FormatException)
            {
                return BadRequest();
            }           

            return CreatedAtAction("GetCart", new { id = cart.id }, cart);
        }

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Cart>> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.id == id);
        }
    }
}
