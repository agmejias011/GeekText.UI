using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Book
    {
        [Key, Required]
        public int id { get; set; }
        //[Required]
        public string isbn { get; set; }
        //[Required]
        public string title { get; set; }
        //[Required]
        public string author { get; set; }
        public string bio { get; set; }
        //[Required]
        public string genre { get; set; }
        //[Required]
        public string description { get; set; }
        //[Required]
        public double price { get; set; }
        //[Required]
        public double rating { get; set; }
        //[Required]
        public string img_url { get; set; }
        //[Required]
        public string publisher { get; set; }
        //[Required]
        public DateTime date { get; set; }

        public List<WishlistBook> wishlist_books { get; set; }
        public virtual ICollection<Book_Author> Book_Authors { get; set; }
        public virtual ICollection<Book_Genre> Book_Genres { get; set; }
   
    }
}
