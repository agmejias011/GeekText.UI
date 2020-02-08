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
        [ForeignKey("payment_method"), Required]
        public int payment_id { get; set; }       
        [ForeignKey("user"), Required]
        public int user_id { get; set; }
        [ForeignKey("cart"), Required]
        public int cart_id { get; set; }
    }
}
