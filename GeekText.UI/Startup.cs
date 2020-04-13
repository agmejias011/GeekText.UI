using GeekText.Database;
using GeekText.UI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace ecommercewebsite
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services
                .AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );

            services.AddCors(options => options.AddDefaultPolicy(builder =>
            {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "GeekText.UI/ClientApp/build";
            });

            string connectionString = Configuration.GetConnectionString("PgDatabase");
            services.AddDbContext<DbContextApplication>(options =>
                options.UseNpgsql(connectionString)
            );
            services.AddScoped<IGenreRepository, GenreRepository>();
            services.AddScoped<IAuthorRepository, AuthorRepository>();
            services.AddScoped<IBookRepository, BookRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
               scope.ServiceProvider.GetService<DbContextApplication>().Database.EnsureCreated();

                /*uncoment for seeding the database and comment after running the code for the first time
                this is just to seed the database. If the code is run multiple times without commenting the
                line below, it will create duplicate data in the DB*/
                //var context = scope.ServiceProvider.GetRequiredService<DbContextApplication>();
                //DbSeedingClass.SeedDataContext(context);
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseCors();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "GeekText.UI/ClientApp";

                if (env.IsDevelopment())
                {
                    // Start React manually to avoid Windows/VS/Ubuntu command conflicts
                    // Someone can fix this if they'd like or know how
                    // spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
