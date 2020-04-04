using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Wishlist
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public bool primary { get; set; }

        public int user_id { get; set; }
        [ForeignKey("user_id")]
        public User user { get; set; }

        public List<WishlistBook> wishlist_books { get; set; }
    }
}
