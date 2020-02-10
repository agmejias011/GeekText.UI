using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    public class Cart
    {
        [Key, Required]
        public int id { get; set; }
        [Required]
        public int quantity_items { get; set; }
        [Required]
        public decimal total_cost { get; set; }
        [Required]
        public bool saved_for_later { get; set; }
        [ForeignKey("user"), Required]
        public decimal user_id { get; set; }
    }
}
