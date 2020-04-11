using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekText.UI.Dto
{
    public class BookDto
    {
        public int id { get; set; }
        public string isbn { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string bio { get; set; }
        public string genre { get; set; }
        public string description { get; set; }
        public double price { get; set; }
        public double rating { get; set; }
        public string img_url { get; set; }
        public string publisher { get; set; }
        public DateTime date { get; set; }
        public bool top_seller { get; set; }
        public bool featured { get; set; }
    }
}
