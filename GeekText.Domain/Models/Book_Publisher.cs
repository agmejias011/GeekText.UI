//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Text;

//namespace GeekText.Domain.Models
//{
//    //[Table("book_publisher")]
//    //public class Book_Publisher
//    //{
//    //    [ForeignKey("publisher_id")]
//    //    public int publisher_id { get; set; }

//    //    [ForeignKey("book_id")]
//    //    public int book_id { get; set; }

//    //}

//    [Table("publisher_books")]
//    public class Book_Publisher
//    {
//        public int publisher_id { get; set; }
//        [ForeignKey("publisher_id")]
//        public Publisher publisher { get; set; }

//        public int book_id { get; set; }
//        [ForeignKey("book_id")]
//        public Book book { get; set; }
//    }
//}
