using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Book_Genre
    {

        [ForeignKey("genre_id"), Required]
        public int genre_id { get; set; }
        public Genre genre { get; set; }

        [ForeignKey("book_id"), Required]
        public int book_id { get; set; }
        public Book book { get; set; }
    }
}
