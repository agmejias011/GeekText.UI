using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Payment_Method
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string card_nickname { get; set; }
        [Required]
        public string card_number{ get; set; }
        [Required]
        public string expiration { get; set; }
        [Required]
        public int cvv { get; set; }

    }
}
