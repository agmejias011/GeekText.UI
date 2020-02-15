using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Genre
    {
        [Key]
        public int genre_id { get; set; }
        public string name { get; set; }
    }
}
