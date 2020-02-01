using GeekText.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Database
{
    public class DbContextApplication : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=ec2-34-197-171-33.compute-1.amazonaws.com;" +
                "Database=dbqjkrlrbhs27k;Username=vlieqagwjdfdjh;" +
                "Password=7415b25c9af8cbeaf88dc88e8af6e4bd80fe956ad9b6ce5047a9320dc7d5d917")
                .UseSnakeCaseNamingConvention();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
            => modelBuilder.Entity<Book>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000);

    }
}
