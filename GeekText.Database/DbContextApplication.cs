using GeekText.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure.Internal;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Database
{
    public class DbContextApplication : DbContext
    {
        //Add DBset for each class created under the Domain layer
        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<WishlistBook> WishlistsBooks { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Cart_Book> Cart_Books { get; set; }
        public DbSet<Payment_Method> payment_methods { get; set; }

        public DbContextApplication(DbContextOptions<DbContextApplication> options) : base(options) {}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .UseNpgsql(optionsBuilder.Options.FindExtension<NpgsqlOptionsExtension>().ConnectionString)
                .UseSnakeCaseNamingConvention();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Book>().Property(b => b.id).UseIdentityAlwaysColumn()
                .HasIdentityOptions(startValue: 1000);

            modelBuilder
                .Entity<WishlistBook>()
                .HasKey(wb => new { wb.wishlist_id, wb.book_id });
            modelBuilder
                .Entity<WishlistBook>()
                .HasOne(wb => wb.wishlist)
                .WithMany(w => w.wishlist_books);
            modelBuilder
                .Entity<WishlistBook>()
                .HasOne(wb => wb.book)
                .WithMany(b => b.wishlist_books);

            //Code below is for the book and user to have a serial ID starting at 1000
            //Do the same for any other class you need 
            modelBuilder.Entity<Book>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000);

            modelBuilder.Entity<User>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000);

            modelBuilder.Entity<Cart>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000);

            modelBuilder.Entity<Order>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000);

            modelBuilder.Entity<Cart_Book>(eb =>
             {
                 eb.HasNoKey();                
             });


            modelBuilder.HasDefaultSchema("public");
            base.OnModelCreating(modelBuilder);
        }
    }
}
