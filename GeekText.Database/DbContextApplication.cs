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
        public DbSet<Cart_Book_Line> Cart_Book_Line { get; set; }
        public DbSet<Cart_Order> Cart_Orders { get; set; }
        public DbSet<Cart_User> Cart_User { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment_Method> Payment_methods { get; set; }
        public DbSet<Saved_for_Later> Saved_for_Later { get; set; }          
        public DbSet<user_payment_options> user_payment_options { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book_Author> Books_Authors { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Book_Genre> Books_Genres { get; set; }              


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
                .Entity<Book>().Property(b => b.id).UseIdentityAlwaysColumn()
                .HasIdentityOptions(startValue: 1000);

            /* modelBuilder
                .Entity<WishlistBook>()
                .HasKey(wb => new { wb.wishlist_id, wb.book_id }); */
            modelBuilder
                .Entity<WishlistBook>()
                .HasOne(wb => wb.wishlist)
                .WithMany(w => w.wishlist_books);
            modelBuilder
                .Entity<WishlistBook>()
                .HasOne(wb => wb.book)
                .WithMany(b => b.wishlist_books);


            modelBuilder.Entity<User>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000, incrementBy:1);

            modelBuilder.Entity<Cart>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000, incrementBy: 1);

            modelBuilder.Entity<Cart_Book_Line>().Property(b => b.id).UseIdentityAlwaysColumn()
          .HasIdentityOptions(startValue: 1000, incrementBy: 1);

            modelBuilder.Entity<Cart_Order>().Property(b => b.id).UseIdentityAlwaysColumn()
         .HasIdentityOptions(startValue: 1000, incrementBy: 1);

            modelBuilder.Entity<Cart_User>().Property(b => b.id).UseIdentityAlwaysColumn()
        .HasIdentityOptions(startValue: 1000, incrementBy: 1);

            modelBuilder.Entity<Order>().Property(b => b.id).UseIdentityAlwaysColumn()
          .HasIdentityOptions(startValue: 1000, incrementBy: 1);

            modelBuilder.Entity<Payment_Method>().Property(b => b.id).UseIdentityAlwaysColumn()
          .HasIdentityOptions(startValue: 1000, incrementBy: 1);

            modelBuilder.Entity<Saved_for_Later>().Property(b => b.id).UseIdentityAlwaysColumn()
         .HasIdentityOptions(startValue: 1000, incrementBy: 1);

            modelBuilder.Entity<Author>().Property(b => b.author_id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000);

            modelBuilder.Entity<Genre>().Property(b => b.genre_id).UseIdentityAlwaysColumn()
           .HasIdentityOptions(startValue: 1000);

            modelBuilder.Entity<Book_Author>()
                        .HasKey(ba => new { ba.book_id, ba.author_id });
            modelBuilder.Entity<Book_Author>()
                        .HasOne(b => b.book)
                        .WithMany(ba => ba.Book_Authors)
                        .HasForeignKey(b => b.book_id);
            modelBuilder.Entity<Book_Author>()
                        .HasOne(a => a.author)
                        .WithMany(ba => ba.Books_Author)
                        .HasForeignKey(a => a.author_id);

            modelBuilder.Entity<Book_Genre>()
                        .HasKey(bg => new { bg.book_id, bg.genre_id });
            modelBuilder.Entity<Book_Genre>()
                        .HasOne(b => b.book)
                        .WithMany(bg => bg.Book_Genres)
                        .HasForeignKey(b => b.book_id);
            modelBuilder.Entity<Book_Genre>()
                        .HasOne(g => g.genre)
                        .WithMany(bg => bg.Books_Genre)
                        .HasForeignKey(g => g.genre_id);

            modelBuilder.HasDefaultSchema("public");
            base.OnModelCreating(modelBuilder);
        }
    }
}
