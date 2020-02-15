using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Publisher
    {
        [Key]
        public int publisher_id { get; set; }
        public string name { get; set; }
        public string description { get; set; } 
    }
}
