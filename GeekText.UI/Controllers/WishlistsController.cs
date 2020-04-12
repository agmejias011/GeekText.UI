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
    public class WishlistsController : ControllerBase
    {
        private const int MULTIPLE_PRIMARY = -2;
        private const int MISSING_PRIMARY = -1;

        private readonly DbContextApplication _context;

        public WishlistsController(DbContextApplication context)
        {
            _context = context;
        }

        // GET: api/Wishlists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wishlist>>> GetWishlists()
        {
            return await _context.Wishlists.ToListAsync();
        }

        // GET: api/Wishlists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wishlist>> GetWishlist(int id)
        {
            var wishlist = await _context.Wishlists.FindAsync(id);

            if (wishlist == null)
            {
                return NotFound();
            }

            await _context.Entry(wishlist).Reference(w => w.user).LoadAsync();
            await _context.Entry(wishlist).Collection(w => w.wishlist_books).LoadAsync();

            foreach (WishlistBook tmp in wishlist.wishlist_books)
            {
                await _context.Entry(tmp).Reference(wb => wb.book).LoadAsync();
            }

            return wishlist;
        }

        // PUT: api/Wishlists/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishlist(int id, Wishlist wishlist)
        {
            if (id != wishlist.id)
            {
                return BadRequest();
            }

            int primary_check = await PrimaryIsValid(wishlist);

            if (primary_check != 0)
            {
                return this.RenderError(primary_check);
            }

            _context.Entry(wishlist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishlistExists(id))
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

        // POST: api/Wishlists
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Wishlist>> PostWishlist(Wishlist wishlist)
        {
            int primary_check = await PrimaryIsValid(wishlist);

            if (primary_check != 0)
            {
                return this.RenderError(primary_check);
            }

            _context.Wishlists.Add(wishlist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWishlist", new { id = wishlist.id }, wishlist);
        }

        // DELETE: api/Wishlists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Wishlist>> DeleteWishlist(int id)
        {
            var wishlist = await _context.Wishlists.FindAsync(id);
            if (wishlist == null)
            {
                return NotFound();
            }

            int primary_check = await PrimaryIsValid(wishlist);

            if (primary_check != 0)
            {
                return this.RenderError(primary_check);
            }

            _context.Wishlists.Remove(wishlist);
            await _context.SaveChangesAsync();

            return wishlist;
        }

        private bool WishlistExists(int id)
        {
            return _context.Wishlists.Any(e => e.id == id);
        }

        private async Task<int> PrimaryIsValid(Wishlist wishlist)
        {
            Wishlist tmp = await _context.Wishlists
                .Where(w =>
                    w.id != wishlist.id
                    && w.primary == true
                    && w.user_id == wishlist.user_id
                )
                .FirstOrDefaultAsync();

            if (tmp != null && wishlist.primary)
            {
                tmp.primary = false;

                _context.Entry(tmp).State = EntityState.Modified;
            }
            else if (tmp == null)
            {
                tmp = await _context.Wishlists
                    .Where(w =>
                        w.id != wishlist.id
                        && w.user_id == wishlist.user_id
                    )
                    .FirstOrDefaultAsync();

                if (tmp != null)
                {
                    tmp.primary = true;

                    _context.Entry(tmp).State = EntityState.Modified;
                } else
                {
                    wishlist.primary = true;
                }
            }

            return 0;
        }

        private class Error
        {
            public readonly bool error = true;
            public string message = "";
        }

        private JsonResult RenderError(int error_code)
        {
            Error error = new Error();

            switch (error_code)
            {
                case MULTIPLE_PRIMARY:
                    error.message = "You may only have one primary wish list.";

                    break;

                case MISSING_PRIMARY:
                    error.message = "You must have a primary wish list.";

                    break;
            }

            return new JsonResult(error) { StatusCode = 409 };
        }
    }
}
