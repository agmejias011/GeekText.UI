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
    [Route("api/cart-order")]
    [ApiController]
    public class Cart_OrderController : ControllerBase
    {
        private readonly DbContextApplication _context;

        public Cart_OrderController(DbContextApplication context)
        {
            _context = context;
        }

        // GET: api/Cart_Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart_Order>>> GetCart_Orders()
        {
            return await _context.Cart_Orders.ToListAsync();
        }

        // GET: api/Cart_Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart_Order>> GetCart_Order(int id)
        {
            var cart_Order = await _context.Cart_Orders.FindAsync(id);

            if (cart_Order == null)
            {
                return NotFound();
            }

            return cart_Order;
        }

        // PUT: api/Cart_Order/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart_Order(int id, Cart_Order cart_Order)
        {
            if (id != cart_Order.id)
            {
                return BadRequest();
            }

            _context.Entry(cart_Order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Cart_OrderExists(id))
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

        // POST: api/Cart_Order
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("create")]
        public async Task<ActionResult<Cart_Order>> PostCart_Order([FromBody]Cart_OrderJSON cart_Orderjson)
        {
            var contextPayment = _context.Orders.
                Include(u => u.user).
                Include(p => p.payment_method).
                Where(p => p.id == cart_Orderjson.order_id);

            var contextOrder = contextPayment.FirstOrDefault<Order>();
            var contextCart = _context.Carts.Where(c => c.id == cart_Orderjson.cart_id)
                                            .FirstOrDefault<Cart>();

            Cart_Order cart_Order = new Cart_Order();
            cart_Order.cart = contextCart;
            cart_Order.order = contextOrder;
            
            _context.Cart_Orders.Add(cart_Order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart_Order", new { id = cart_Order.id }, cart_Order.id);
        }

        // DELETE: api/Cart_Order/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Cart_Order>> DeleteCart_Order(int id)
        {
            var cart_Order = await _context.Cart_Orders.FindAsync(id);
            if (cart_Order == null)
            {
                return NotFound();
            }

            _context.Cart_Orders.Remove(cart_Order);
            await _context.SaveChangesAsync();

            return cart_Order;
        }

        private bool Cart_OrderExists(int id)
        {
            return _context.Cart_Orders.Any(e => e.id == id);
        }
    }
}
