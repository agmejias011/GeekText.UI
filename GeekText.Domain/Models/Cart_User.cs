using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Cart_User
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("cart_id"), Required]
        public Cart cart { get; set; }
        [ForeignKey("user_id"), Required]
        public User user { get; set; }
    }
}
