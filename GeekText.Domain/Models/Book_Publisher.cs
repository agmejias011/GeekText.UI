using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{

    public class Book_Publisher
    {
        [ForeignKey("publisher_id"), Required]
        public int publisher_id { get; set; }

        [ForeignKey("book_id"), Required]
        public int book_id { get; set; }

    }
}


