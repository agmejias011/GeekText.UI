using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekText.UI.Controllers.MapperClasses
{
    public class SavedBooksJSON
    {
        public int book_id { get; set; }
        public int user_id { get; set; }
        public int saved_qty { get; set; }
    }
}
