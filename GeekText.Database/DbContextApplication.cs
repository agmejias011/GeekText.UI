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
        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }

        public DbContextApplication(DbContextOptions<DbContextApplication> options) : base(options) {}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .UseNpgsql(optionsBuilder.Options.FindExtension<NpgsqlOptionsExtension>().ConnectionString)
                .UseSnakeCaseNamingConvention();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
            => modelBuilder.Entity<Book>().Property(b => b.id).UseIdentityAlwaysColumn()
            .HasIdentityOptions(startValue: 1000);

    }
}
