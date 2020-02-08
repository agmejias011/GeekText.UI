using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Book
    {
        [Key, Required]
        public int id { get; set; }

        [Required]
        public string title { get; set; }
        [Required]
        public string description { get; set; }
        [Required]
        public double price { get; set; }
        public double rating { get; set; }
        [Required]
        public string img_url { get; set; }
        [Required]
        public DateTime date { get; set; }
        [Required]
        public bool top_seller { get; set; }
        [Required]
        public bool featured { get; set; }

        [ForeignKey("genre"), Required] //Enter the name of the table
        public int genre_id  { get; set; }

        //not complete, refer to the lucidchart link for more fields
    }
}
