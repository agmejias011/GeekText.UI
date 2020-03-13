using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    [Table("user_purchased_book")]
    public class user_purchased_book
    {
        public int book_id { get; set; }
        [ForeignKey("book_id")]
        public Book book { get; set; }

        public int user_id { get; set; }
        [ForeignKey("user_id")]
        public User user { get; set; }
    }
}