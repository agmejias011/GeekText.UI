using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeekText.Database;
using GeekText.Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ecommercewebsite
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //This below is to create the tables in the database
            using (var context = new DbContextApplication())
            {                
                var cars = context.Books.ToArray();
                var users = context.Users.ToArray();
            }

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
