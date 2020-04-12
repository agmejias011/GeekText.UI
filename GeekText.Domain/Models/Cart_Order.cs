using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Cart_Order
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("cart_id"), Required]
        public Cart cart { get; set; }
        [ForeignKey("order_id"), Required]
        public Order order { get; set; }
    }
}
