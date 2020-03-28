using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    [Table("wishlists_books")]
    public class WishlistBook
    {
        [Key]
        public int id { get; set; }

        public int wishlist_id { get; set; }
        [ForeignKey("wishlist_id")]
        public Wishlist wishlist { get; set; }

        public int book_id { get; set; }
        [ForeignKey("book_id")]
        public Book book { get; set; }
    }
}
