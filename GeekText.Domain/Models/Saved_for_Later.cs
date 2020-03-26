using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Saved_for_Later
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("book_id"), Required]
        public Book book { get; set; }
        [ForeignKey("user_id"), Required]
        public User user { get; set; }
        [Required]
        public int saved_qty { get; set; }
        
    }
}
