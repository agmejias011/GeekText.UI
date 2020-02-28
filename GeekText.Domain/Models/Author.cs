using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Author
    {
        [Key]
        public int author_id { get; set; }
        public string name { get; set; }
        public string bio { get; set; }
        public string photograph_url { get; set; }
       
    }
}
