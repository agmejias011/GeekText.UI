using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Author
    {
        [Key]
        public int author_id { get; set; }
        [Required]
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string bio { get; set; }
        public string photograph_url { get; set; }

        public virtual ICollection<Book_Author> Books_Author { get; set; }

    }
}
