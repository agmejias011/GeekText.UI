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
    [Route("api/cart-user")]
    [ApiController]
    public class Cart_UserController : ControllerBase
    {
        private readonly DbContextApplication _context;

        public Cart_UserController(DbContextApplication context)
        {
            _context = context;
        }

        // GET: api/Cart_User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart_User>>> GetCart_User()
        {
            return await _context.Cart_User.ToListAsync();
        }

        // GET: api/Cart_User/5
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

        // PUT: api/Cart_User/5
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

        // POST: api/Cart_User
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("create")]
        public async Task<ActionResult<Cart_User>> PostCart_User([FromBody]Cart_UserJSON cart_userjson)
        {
            var contextCart = _context.Carts.Where(c => c.id == cart_userjson.cart_id);
            var contextUser = _context.Users.Where(u => u.id == cart_userjson.user_id);

            Cart_User cart_user = new Cart_User();
            cart_user.cart = contextCart.FirstOrDefault<Cart>();
            cart_user.user = contextUser.FirstOrDefault<User>();

            _context.Cart_User.Add(cart_user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart_User", new { id = cart_user.id }, cart_user.id);
        }

        // DELETE: api/Cart_User/5
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
