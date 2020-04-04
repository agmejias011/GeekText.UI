namespace GeekText.UI.Controllers.MapperClasses
{
    public class Cart_Book_LineJSON
    {
        public int cart_id { get; set; }
        public int book_id { get; set; }
        public int ordered_qty { get; set; }
        public decimal book_price { get; set; }
    }
}