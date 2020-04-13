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
    public class WishlistBooksController : ControllerBase
    {
        private readonly DbContextApplication _context;

        public WishlistBooksController(DbContextApplication context)
        {
            _context = context;
        }

        // GET: api/WishlistBooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishlistBook>>> GetWishlistsBooks()
        {
            return await _context.WishlistsBooks.ToListAsync();
        }

        // GET: api/WishlistBooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WishlistBook>> GetWishlistBook(int id)
        {
            var wishlistBook = await _context.WishlistsBooks.FindAsync(id);

            if (wishlistBook == null)
            {
                return NotFound();
            }

            return wishlistBook;
        }

        // PUT: api/WishlistBooks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishlistBook(int id, WishlistBook wishlistBook)
        {
            _context.Entry(wishlistBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishlistBookExists(id))
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

        // POST: api/WishlistBooks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<WishlistBook>> PostWishlistBook(WishlistBook wishlistBook)
        {
            int user_id = wishlistBook.wishlist_id;
            Wishlist tmp = await _context.Wishlists
                .Where(w =>
                    w.user_id == user_id
                    && w.primary == true
                )
                .FirstOrDefaultAsync();

            if (tmp != null)
            {
                wishlistBook.wishlist_id = tmp.id;

                _context.WishlistsBooks.Add(wishlistBook);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WishlistBookExists(wishlistBook.wishlist_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWishlistBook", new { id = wishlistBook.wishlist_id }, wishlistBook);
        }

        // DELETE: api/WishlistBooks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WishlistBook>> DeleteWishlistBook(int id)
        {
            var wishlistBook = await _context.WishlistsBooks.FindAsync(id);
            if (wishlistBook == null)
            {
                return NotFound();
            }

            _context.WishlistsBooks.Remove(wishlistBook);
            await _context.SaveChangesAsync();

            return wishlistBook;
        }

        private bool WishlistBookExists(int id)
        {
            return _context.WishlistsBooks.Any(e => e.wishlist_id == id);
        }
    }
}
