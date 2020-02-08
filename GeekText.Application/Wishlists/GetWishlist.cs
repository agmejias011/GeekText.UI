using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Wishlists
{
    public class GetWishlist
    {
        private DbContextApplication context;

        public GetWishlist(DbContextApplication context)
        {
            this.context = context;
        }

        public Wishlist Get(int id)
        {
            return context.Wishlists.Find(id);
        }
    }
}
