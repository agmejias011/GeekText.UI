using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GeekText.Domain.Models
{
    public class User
    {
        [Key]
        public int id { get; set; }
        public string username { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string user_password { get; set; }
        public string nickname { get; set; }
        public string home_address { get; set; }
        public int user_nickname { get; set; }

        public List<Wishlist> Wishlists { get; set; }
    }
}
