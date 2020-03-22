using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GeekText.Domain.Models
{
    public class User
    {
        [Key, Required]
        public int id { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string first_name { get; set; }
        [Required]
        public string last_name { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string user_password { get; set; }
        [Required]
        public string nickname { get; set; }
        [Required]
        public string home_address { get; set; }
        public string user_nickname { get; set; }

        public List<Wishlist> wishlists { get; set; }
        public virtual ICollection<Cart> Cart { get; set; }
        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<Saved_for_Later> Saved_for_Later { get; set; }
    }
}
