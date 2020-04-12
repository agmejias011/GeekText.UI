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
            return await _context.Carts.ToListAsync();
        }

        // GET: api/Cart/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);    

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
        public async Task<ActionResult<Order>> PostCart([FromBody]OrderItems order_json)
        {
            Order order = new Order(); 
            try
            {
                Cart cart = new Cart();
                cart.cart_total = order_json.cart_total;
                cart.item_total = order_json.item_total;
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();


                User user = new User();
                user = _context.Users.Find(order_json.user_id);

                foreach (var item in order_json.item_line)
                {
                    Cart_Book_Line cart_book_line = new Cart_Book_Line();

                    cart_book_line.cart = cart;
 
                    cart_book_line.book = _context.Books.Find(item.book_id);                   

                    cart_book_line.ordered_qty = item.ordered_qty; 

                    cart_book_line.book_price = item.book_price;

                    _context.Cart_Book_Line.Add(cart_book_line);
                    await _context.SaveChangesAsync();

                }

                foreach (var item in order_json.item_line_saved)
                {
                    Saved_for_Later savedBook = new Saved_for_Later();

                    savedBook.book = _context.Books.Find(item.book_id);
                    savedBook.user = _context.Users.Find(user.id);
                    savedBook.saved_qty = item.saved_qty;

                    _context.Saved_for_Later.Add(savedBook);
                    await _context.SaveChangesAsync();

                }

               var contextPO = _context.user_payment_options.
               Include(u => u.user).
               Include(p => p.payment_method).
               Where(p => p.user.id == order_json.user_id);

                Payment_Method payment = new Payment_Method();
                payment = contextPO.FirstOrDefault<user_payment_options>().payment_method;                   
              
                order.user = user;
                order.payment_method = payment;

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                Cart_Order cart_order = new Cart_Order();

                cart_order.cart = cart;

                cart_order.order = order;

                _context.Cart_Orders.Add(cart_order);
                await _context.SaveChangesAsync();

                Cart_User cart_user = new Cart_User();

                cart_user.cart = cart;

                cart_user.user = user;

                _context.Cart_User.Add(cart_user);
                await _context.SaveChangesAsync();

                return order;
            }
            catch (FormatException)
            {
                return null;
            }
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
