using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    [Table("book_author")]
    public class Book_Author
    {
        [ForeignKey("author_id")]
        public int author_id { get; set; }

        [ForeignKey("book_id")]
        public int book_id { get; set; }
    }
}
