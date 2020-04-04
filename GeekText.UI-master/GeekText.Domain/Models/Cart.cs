using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Cart
    {
        [Key]
        public int id { get; set; }
        
        [Required]       
        public decimal cart_total { get; set; }

        [Required]
        public int item_total { get; set; }


    }
}
