using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Cart_Book
    {
        [ForeignKey("cart_id"), Required]
        public Cart cart { get; set; }
        [ForeignKey("book_id"), Required]
        public Book book { get; set; }
    }
}
