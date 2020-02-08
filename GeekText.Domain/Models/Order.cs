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
        [ForeignKey("payment_id"), Required]
        public Payment_Method payment_method { get; set; }       
        [ForeignKey("user"), Required]
        public User user { get; set; }
        [ForeignKey("cart"), Required]
        public Cart cart { get; set; }
    }
}
