using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Book
    {
        [Key]
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public double price { get; set; }
        public double rating { get; set; }
        public string img_url { get; set; }
        public DateTime date { get; set; }
        public bool top_seller { get; set; }
        public bool featured { get; set; }

        [ForeignKey("genre_id")]
        public int genre_id  { get; set; }

        //not complete, refer to the lucidchart link for more fields
    }
}
