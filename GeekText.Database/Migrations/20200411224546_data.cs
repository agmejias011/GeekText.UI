using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace GeekText.Database.Migrations
{
    public partial class data : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_carts_users_user_id",
                schema: "public",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "fk_orders_carts_cart_id",
                schema: "public",
                table: "orders");

            migrationBuilder.DropTable(
                name: "cart_books",
                schema: "public");

            migrationBuilder.DropIndex(
                name: "ix_orders_cart_id",
                schema: "public",
                table: "orders");

            migrationBuilder.DropIndex(
                name: "ix_carts_user_id",
                schema: "public",
                table: "carts");

            migrationBuilder.DropPrimaryKey(
                name: "pk_book_author",
                schema: "public",
                table: "book_author");

            migrationBuilder.DropPrimaryKey(
                name: "pk_book_publishers",
                schema: "public",
                table: "book_publishers");

            migrationBuilder.DropColumn(
                name: "cart_id",
                schema: "public",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "quantity_items",
                schema: "public",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "total_cost",
                schema: "public",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "user_id",
                schema: "public",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "genre_id",
                schema: "public",
                table: "books");

            migrationBuilder.DropColumn(
                name: "name",
                schema: "public",
                table: "authors");

            migrationBuilder.RenameTable(
                name: "book_publishers",
                schema: "public",
                newName: "books_publishers",
                newSchema: "public");

            migrationBuilder.AddColumn<string>(
                name: "home_address2",
                schema: "public",
                table: "users",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "card_number",
                schema: "public",
                table: "payment_methods",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                schema: "public",
                table: "payment_methods",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<decimal>(
                name: "cart_total",
                schema: "public",
                table: "carts",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "item_total",
                schema: "public",
                table: "carts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "title",
                schema: "public",
                table: "books",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "img_url",
                schema: "public",
                table: "books",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "description",
                schema: "public",
                table: "books",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                schema: "public",
                table: "books",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn);

            migrationBuilder.AddColumn<string>(
                name: "isbn",
                schema: "public",
                table: "books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "first_name",
                schema: "public",
                table: "authors",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "last_name",
                schema: "public",
                table: "authors",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "pk_book_author",
                schema: "public",
                table: "book_author",
                columns: new[] { "book_id", "author_id" });

            migrationBuilder.AddPrimaryKey(
                name: "pk_books_publishers",
                schema: "public",
                table: "books_publishers",
                columns: new[] { "book_id", "publisher_id" });

            migrationBuilder.CreateTable(
                name: "books_genres",
                schema: "public",
                columns: table => new
                {
                    genre_id = table.Column<int>(nullable: false),
                    book_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_books_genres", x => new { x.book_id, x.genre_id });
                    table.ForeignKey(
                        name: "fk_books_genres_books_bookid",
                        column: x => x.book_id,
                        principalSchema: "public",
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_books_genres_genres_genre_id1",
                        column: x => x.genre_id,
                        principalSchema: "public",
                        principalTable: "genres",
                        principalColumn: "genre_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cart_book_line",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    cart_id = table.Column<int>(nullable: false),
                    book_id = table.Column<int>(nullable: false),
                    ordered_qty = table.Column<int>(nullable: false),
                    book_price = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_cart_book_line", x => x.id);
                    table.ForeignKey(
                        name: "fk_cart_book_line_books_book_id",
                        column: x => x.book_id,
                        principalSchema: "public",
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_cart_book_line_carts_cart_id",
                        column: x => x.cart_id,
                        principalSchema: "public",
                        principalTable: "carts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cart_orders",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    cart_id = table.Column<int>(nullable: false),
                    order_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_cart_orders", x => x.id);
                    table.ForeignKey(
                        name: "fk_cart_orders_carts_cart_id",
                        column: x => x.cart_id,
                        principalSchema: "public",
                        principalTable: "carts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_cart_orders_orders_order_id",
                        column: x => x.order_id,
                        principalSchema: "public",
                        principalTable: "orders",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cart_user",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    cart_id = table.Column<int>(nullable: false),
                    user_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_cart_user", x => x.id);
                    table.ForeignKey(
                        name: "fk_cart_user_carts_cart_id",
                        column: x => x.cart_id,
                        principalSchema: "public",
                        principalTable: "carts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_cart_user_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "saved_for_later",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    book_id = table.Column<int>(nullable: false),
                    user_id = table.Column<int>(nullable: false),
                    saved_qty = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_saved_for_later", x => x.id);
                    table.ForeignKey(
                        name: "fk_saved_for_later_books_book_id",
                        column: x => x.book_id,
                        principalSchema: "public",
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_saved_for_later_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_payment_options",
                schema: "public",
                columns: table => new
                {
                    user_id = table.Column<int>(nullable: true),
                    payment_id = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "fk_user_payment_options_payment_methods_payment_id",
                        column: x => x.payment_id,
                        principalSchema: "public",
                        principalTable: "payment_methods",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_user_payment_options_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "ix_book_author_author_id",
                schema: "public",
                table: "book_author",
                column: "author_id");

            migrationBuilder.CreateIndex(
                name: "ix_books_publishers_publisher_id",
                schema: "public",
                table: "books_publishers",
                column: "publisher_id");

            migrationBuilder.CreateIndex(
                name: "ix_books_genres_genre_id",
                schema: "public",
                table: "books_genres",
                column: "genre_id");

            migrationBuilder.CreateIndex(
                name: "ix_cart_book_line_book_id",
                schema: "public",
                table: "cart_book_line",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "ix_cart_book_line_cart_id",
                schema: "public",
                table: "cart_book_line",
                column: "cart_id");

            migrationBuilder.CreateIndex(
                name: "ix_cart_orders_cart_id",
                schema: "public",
                table: "cart_orders",
                column: "cart_id");

            migrationBuilder.CreateIndex(
                name: "ix_cart_orders_order_id",
                schema: "public",
                table: "cart_orders",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "ix_cart_user_cart_id",
                schema: "public",
                table: "cart_user",
                column: "cart_id");

            migrationBuilder.CreateIndex(
                name: "ix_cart_user_user_id",
                schema: "public",
                table: "cart_user",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_saved_for_later_book_id",
                schema: "public",
                table: "saved_for_later",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "ix_saved_for_later_user_id",
                schema: "public",
                table: "saved_for_later",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_payment_options_payment_id",
                schema: "public",
                table: "user_payment_options",
                column: "payment_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_payment_options_user_id",
                schema: "public",
                table: "user_payment_options",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_book_author_authors_author_id1",
                schema: "public",
                table: "book_author",
                column: "author_id",
                principalSchema: "public",
                principalTable: "authors",
                principalColumn: "author_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_book_author_books_bookid",
                schema: "public",
                table: "book_author",
                column: "book_id",
                principalSchema: "public",
                principalTable: "books",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_books_publishers_books_bookid",
                schema: "public",
                table: "books_publishers",
                column: "book_id",
                principalSchema: "public",
                principalTable: "books",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_books_publishers_publishers_publisher_id1",
                schema: "public",
                table: "books_publishers",
                column: "publisher_id",
                principalSchema: "public",
                principalTable: "publishers",
                principalColumn: "publisher_id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_book_author_authors_author_id1",
                schema: "public",
                table: "book_author");

            migrationBuilder.DropForeignKey(
                name: "fk_book_author_books_bookid",
                schema: "public",
                table: "book_author");

            migrationBuilder.DropForeignKey(
                name: "fk_books_publishers_books_bookid",
                schema: "public",
                table: "books_publishers");

            migrationBuilder.DropForeignKey(
                name: "fk_books_publishers_publishers_publisher_id1",
                schema: "public",
                table: "books_publishers");

            migrationBuilder.DropTable(
                name: "books_genres",
                schema: "public");

            migrationBuilder.DropTable(
                name: "cart_book_line",
                schema: "public");

            migrationBuilder.DropTable(
                name: "cart_orders",
                schema: "public");

            migrationBuilder.DropTable(
                name: "cart_user",
                schema: "public");

            migrationBuilder.DropTable(
                name: "saved_for_later",
                schema: "public");

            migrationBuilder.DropTable(
                name: "user_payment_options",
                schema: "public");

            migrationBuilder.DropPrimaryKey(
                name: "pk_book_author",
                schema: "public",
                table: "book_author");

            migrationBuilder.DropIndex(
                name: "ix_book_author_author_id",
                schema: "public",
                table: "book_author");

            migrationBuilder.DropPrimaryKey(
                name: "pk_books_publishers",
                schema: "public",
                table: "books_publishers");

            migrationBuilder.DropIndex(
                name: "ix_books_publishers_publisher_id",
                schema: "public",
                table: "books_publishers");

            migrationBuilder.DropColumn(
                name: "home_address2",
                schema: "public",
                table: "users");

            migrationBuilder.DropColumn(
                name: "cart_total",
                schema: "public",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "item_total",
                schema: "public",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "isbn",
                schema: "public",
                table: "books");

            migrationBuilder.DropColumn(
                name: "first_name",
                schema: "public",
                table: "authors");

            migrationBuilder.DropColumn(
                name: "last_name",
                schema: "public",
                table: "authors");

            migrationBuilder.RenameTable(
                name: "books_publishers",
                schema: "public",
                newName: "book_publishers",
                newSchema: "public");

            migrationBuilder.AlterColumn<int>(
                name: "card_number",
                schema: "public",
                table: "payment_methods",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<int>(
                name: "id",
                schema: "public",
                table: "payment_methods",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int))
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn);

            migrationBuilder.AddColumn<int>(
                name: "cart_id",
                schema: "public",
                table: "orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "quantity_items",
                schema: "public",
                table: "carts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "total_cost",
                schema: "public",
                table: "carts",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "user_id",
                schema: "public",
                table: "carts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "title",
                schema: "public",
                table: "books",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "img_url",
                schema: "public",
                table: "books",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "description",
                schema: "public",
                table: "books",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "id",
                schema: "public",
                table: "books",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int))
                .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "genre_id",
                schema: "public",
                table: "books",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "name",
                schema: "public",
                table: "authors",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "pk_book_author",
                schema: "public",
                table: "book_author",
                columns: new[] { "author_id", "book_id" });

            migrationBuilder.AddPrimaryKey(
                name: "pk_book_publishers",
                schema: "public",
                table: "book_publishers",
                columns: new[] { "publisher_id", "book_id" });

            migrationBuilder.CreateTable(
                name: "cart_books",
                schema: "public",
                columns: table => new
                {
                    book_id = table.Column<int>(type: "integer", nullable: false),
                    cart_id = table.Column<int>(type: "integer", nullable: false),
                    saved_for_later = table.Column<bool>(type: "boolean", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "ix_orders_cart_id",
                schema: "public",
                table: "orders",
                column: "cart_id");

            migrationBuilder.CreateIndex(
                name: "ix_carts_user_id",
                schema: "public",
                table: "carts",
                column: "user_id");

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

            migrationBuilder.AddForeignKey(
                name: "fk_carts_users_user_id",
                schema: "public",
                table: "carts",
                column: "user_id",
                principalSchema: "public",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_orders_carts_cart_id",
                schema: "public",
                table: "orders",
                column: "cart_id",
                principalSchema: "public",
                principalTable: "carts",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
