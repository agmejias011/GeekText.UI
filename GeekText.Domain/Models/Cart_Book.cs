using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Cart_Book
    {
        [ForeignKey("cart"), Required]
        public int cart_id { get; set; }
        [ForeignKey("book"), Required]
        public int book_id { get; set; }
    }
}
