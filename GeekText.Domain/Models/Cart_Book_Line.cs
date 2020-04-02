using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Cart_Book_Line
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("cart_id"), Required]
        public Cart cart { get; set; }

        [ForeignKey("book_id"), Required]
        public Book book { get; set; }

        [Required]
        public int ordered_qty { get; set; }

        [Required]
        public decimal book_price { get; set; }
    }
}
