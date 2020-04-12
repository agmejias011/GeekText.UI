using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GeekText.Domain.Models
{
    [Table("user_payment_options")]
    public class user_payment_options
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("user_id")]
        public User user { get; set; }
       
        [ForeignKey("payment_id")]
        public Payment_Method payment_method { get; set; }
    }
}