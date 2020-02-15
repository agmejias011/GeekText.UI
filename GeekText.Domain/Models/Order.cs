using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Order
    {
        [Key, Required]
        public int id { get; set; }

        public int payment_id { get; set; }
        [ForeignKey("payment_id"), Required]
        public Payment_Method payment_method { get; set; }       

        public int user_id { get; set; }
        [ForeignKey("user_id"), Required]
        public User user { get; set; }

        public int cart_id { get; set; }
        [ForeignKey("cart_id"), Required]
        public Cart cart { get; set; }
    }
}
