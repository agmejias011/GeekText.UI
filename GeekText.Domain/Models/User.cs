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
        [Required]
        public string username { get; set; }
        [Required]
        public string first_name { get; set; }
        [Required]
        public string last_name { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string user_password { get; set; }
        [Required]
        public string nickname { get; set; }
        [Required]
        public string home_address { get; set; }
	public string home_address2 { get; set; }
        public string home_address3 { get; set; }
        public int user_nickname { get; set; }

        public List<Wishlist> wishlists { get; set; }
     
    }
}
