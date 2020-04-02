using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace GeekText.Database.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.CreateTable(
                name: "authors",
                schema: "public",
                columns: table => new
                {
                    author_id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    name = table.Column<string>(nullable: true),
                    bio = table.Column<string>(nullable: true),
                    photograph_url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_authors", x => x.author_id);
                });

            migrationBuilder.CreateTable(
                name: "book_author",
                schema: "public",
                columns: table => new
                {
                    author_id = table.Column<int>(nullable: false),
                    book_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_book_author", x => new { x.author_id, x.book_id });
                });

            migrationBuilder.CreateTable(
                name: "book_publishers",
                schema: "public",
                columns: table => new
                {
                    publisher_id = table.Column<int>(nullable: false),
                    book_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_book_publishers", x => new { x.publisher_id, x.book_id });
                });

            migrationBuilder.CreateTable(
                name: "books",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    title = table.Column<string>(nullable: false),
                    description = table.Column<string>(nullable: false),
                    price = table.Column<double>(nullable: false),
                    rating = table.Column<double>(nullable: false),
                    img_url = table.Column<string>(nullable: false),
                    date = table.Column<DateTime>(nullable: false),
                    top_seller = table.Column<bool>(nullable: false),
                    featured = table.Column<bool>(nullable: false),
                    genre_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_books", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "genres",
                schema: "public",
                columns: table => new
                {
                    genre_id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_genres", x => x.genre_id);
                });

            migrationBuilder.CreateTable(
                name: "payment_methods",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    card_nickname = table.Column<string>(nullable: false),
                    card_number = table.Column<int>(nullable: false),
                    expiration = table.Column<string>(nullable: false),
                    cvv = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_payment_methods", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "publishers",
                schema: "public",
                columns: table => new
                {
                    publisher_id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    name = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_publishers", x => x.publisher_id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    username = table.Column<string>(nullable: false),
                    first_name = table.Column<string>(nullable: false),
                    last_name = table.Column<string>(nullable: false),
                    email = table.Column<string>(nullable: false),
                    user_password = table.Column<string>(nullable: false),
                    nickname = table.Column<string>(nullable: false),
                    home_address = table.Column<string>(nullable: false),
                    user_nickname = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "carts",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    quantity_items = table.Column<int>(nullable: false),
                    total_cost = table.Column<decimal>(nullable: false),
                    user_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_carts", x => x.id);
                    table.ForeignKey(
                        name: "fk_carts_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "wishlists",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(nullable: true),
                    primary = table.Column<bool>(nullable: false),
                    user_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_wishlists", x => x.id);
                    table.ForeignKey(
                        name: "fk_wishlists_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cart_books",
                schema: "public",
                columns: table => new
                {
                    cart_id = table.Column<int>(nullable: false),
                    book_id = table.Column<int>(nullable: false),
                    saved_for_later = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "fk_cart_books_books_book_id",
                        column: x => x.book_id,
                        principalSchema: "public",
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_cart_books_carts_cart_id",
                        column: x => x.cart_id,
                        principalSchema: "public",
                        principalTable: "carts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "orders",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    payment_id = table.Column<int>(nullable: false),
                    user_id = table.Column<int>(nullable: false),
                    cart_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_orders", x => x.id);
                    table.ForeignKey(
                        name: "fk_orders_carts_cart_id",
                        column: x => x.cart_id,
                        principalSchema: "public",
                        principalTable: "carts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_orders_payment_methods_payment_id",
                        column: x => x.payment_id,
                        principalSchema: "public",
                        principalTable: "payment_methods",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_orders_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "wishlists_books",
                schema: "public",
                columns: table => new
                {
                    wishlist_id = table.Column<int>(nullable: false),
                    book_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_wishlists_books", x => new { x.wishlist_id, x.book_id });
                    table.ForeignKey(
                        name: "fk_wishlists_books_books_book_id",
                        column: x => x.book_id,
                        principalSchema: "public",
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_wishlists_books_wishlists_wishlist_id",
                        column: x => x.wishlist_id,
                        principalSchema: "public",
                        principalTable: "wishlists",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_cart_books_book_id",
                schema: "public",
                table: "cart_books",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "ix_cart_books_cart_id",
                schema: "public",
                table: "cart_books",
                column: "cart_id");

            migrationBuilder.CreateIndex(
                name: "ix_carts_user_id",
                schema: "public",
                table: "carts",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_orders_cart_id",
                schema: "public",
                table: "orders",
                column: "cart_id");

            migrationBuilder.CreateIndex(
                name: "ix_orders_payment_id",
                schema: "public",
                table: "orders",
                column: "payment_id");

            migrationBuilder.CreateIndex(
                name: "ix_orders_user_id",
                schema: "public",
                table: "orders",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_wishlists_user_id",
                schema: "public",
                table: "wishlists",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_wishlists_books_book_id",
                schema: "public",
                table: "wishlists_books",
                column: "book_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "authors",
                schema: "public");

            migrationBuilder.DropTable(
                name: "book_author",
                schema: "public");

            migrationBuilder.DropTable(
                name: "book_publishers",
                schema: "public");

            migrationBuilder.DropTable(
                name: "cart_books",
                schema: "public");

            migrationBuilder.DropTable(
                name: "genres",
                schema: "public");

            migrationBuilder.DropTable(
                name: "orders",
                schema: "public");

            migrationBuilder.DropTable(
                name: "publishers",
                schema: "public");

            migrationBuilder.DropTable(
                name: "wishlists_books",
                schema: "public");

            migrationBuilder.DropTable(
                name: "carts",
                schema: "public");

            migrationBuilder.DropTable(
                name: "payment_methods",
                schema: "public");

            migrationBuilder.DropTable(
                name: "books",
                schema: "public");

            migrationBuilder.DropTable(
                name: "wishlists",
                schema: "public");

            migrationBuilder.DropTable(
                name: "users",
                schema: "public");
        }
    }
}
