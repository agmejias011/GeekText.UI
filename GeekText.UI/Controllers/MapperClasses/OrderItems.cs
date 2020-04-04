using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekText.UI.Controllers.MapperClasses
{
    public class OrderItems
    {     
        public decimal cart_total { get; set; }
        public int item_total { get; set; }
        public int user_id { get; set; }

        public List<Cart_Book_LineJSON> item_line = new List<Cart_Book_LineJSON>();

        public List<SavedLaterJSON> item_line_saved = new List<SavedLaterJSON>();

    }
}
