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
    [Route("api/[controller]")]
    [ApiController]
    public class Cart_User1Controller : ControllerBase
    {
        private readonly DbContextApplication _context;

        public Cart_User1Controller(DbContextApplication context)
        {
            _context = context;
        }

        // GET: api/Cart_User1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart_User>>> GetCart_User()
        {
            return await _context.Cart_User.ToListAsync();
        }

        // GET: api/Cart_User1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart_User>> GetCart_User(int id)
        {
            var cart_User = await _context.Cart_User.FindAsync(id);

            if (cart_User == null)
            {
                return NotFound();
            }

            return cart_User;
        }

        // PUT: api/Cart_User1/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart_User(int id, Cart_User cart_User)
        {
            if (id != cart_User.id)
            {
                return BadRequest();
            }

            _context.Entry(cart_User).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Cart_UserExists(id))
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

        // POST: api/Cart_User1
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Cart_User>> PostCart_User(Cart_User cart_User)
        {
            _context.Cart_User.Add(cart_User);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart_User", new { id = cart_User.id }, cart_User);
        }

        // DELETE: api/Cart_User1/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Cart_User>> DeleteCart_User(int id)
        {
            var cart_User = await _context.Cart_User.FindAsync(id);
            if (cart_User == null)
            {
                return NotFound();
            }

            _context.Cart_User.Remove(cart_User);
            await _context.SaveChangesAsync();

            return cart_User;
        }

        private bool Cart_UserExists(int id)
        {
            return _context.Cart_User.Any(e => e.id == id);
        }
    }
}
