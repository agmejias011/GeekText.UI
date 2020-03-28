using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekText.UI.Dto
{
    public class AuthorDto
    {
        public int author_id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string bio { get; set; }
        public string photograph_url { get; set; }
    }
}
