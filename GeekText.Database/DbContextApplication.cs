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
        public DbSet<Saved_for_Later> Saved_for_Later { get; set; }
          public DbSet<Payment_Method> Payment_methods { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Publisher> Publishers{ get; set; }
        public DbSet<Book_Publisher> Books_Publishers { get; set; }
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
            //modelBuilder
            //    .Entity<Book>().Property(b => b.id).UseIdentityAlwaysColumn()
            //    .HasIdentityOptions(startValue: 1000);

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

            modelBuilder.Entity<User>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000, incrementBy:1);

            modelBuilder.Entity<Cart>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000, incrementBy: 1);

            modelBuilder.Entity<Cart>()
                      .HasKey(ba => new { ba.id });

            //modelBuilder.Entity<Cart>()
            //            .HasOne(b => b.user)
            //            .WithMany(bp => bp.Cart)
            //            .HasForeignKey(b => b.user);

            modelBuilder.Entity<Order>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000, incrementBy: 1);

            modelBuilder.Entity<Order>()
                     .HasKey(ba => new { ba.id });

            //modelBuilder.Entity<Order>()
            //           .HasOne(b => b.user)
            //           .WithMany(bp => bp.Order)
            //           .HasForeignKey(ba => new { ba.user, ba.cart });

            modelBuilder.Entity<Order>()
                      .HasOne(b => b.cart)
                      .WithOne(bp => bp.order);

            modelBuilder.Entity<Cart_Book>(eb =>
            {
                eb.HasNoKey();
            });

            //modelBuilder.Entity<Cart_Book>()
            //            .HasOne(b => b.cart)
            //            .WithMany(bp => bp.cart_Book)
            //            .HasForeignKey(ba => new { ba.book, ba.cart });


            modelBuilder.Entity<Saved_for_Later>(eb =>
            {
                eb.HasNoKey();
            });
            //modelBuilder.Entity<Saved_for_Later>()
            //              .HasOne(b => b.user)
            //              .WithMany(bp => bp.Saved_for_Later)
            //              .HasForeignKey(ba => new { ba.books, ba.user });

            modelBuilder.Entity<Book>()
                          .HasMany(b => b.Saved_for_Later)
                          .WithMany(bp => bp.)
                          .HasForeignKey(ba => new { ba.books, ba.user });

            modelBuilder.Entity<Author>().Property(b => b.author_id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000);

            modelBuilder.Entity<Publisher>().Property(b => b.publisher_id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000);

            modelBuilder.Entity<Genre>().Property(b => b.genre_id).UseIdentityAlwaysColumn()
           .HasIdentityOptions(startValue: 1000);

            modelBuilder.Entity<Book_Publisher>()
                        .HasKey(bp => new { bp.book_id, bp.publisher_id });
            modelBuilder.Entity<Book_Publisher>()
                        .HasOne(b => b.book)
                        .WithMany(bp => bp.Book_Publishers)
                        .HasForeignKey(b => b.book_id);
            modelBuilder.Entity<Book_Publisher>()
                        .HasOne(p => p.publisher)
                        .WithMany(bp => bp.Books_Publisher)
                        .HasForeignKey(p => p.publisher_id);

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
