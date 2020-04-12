using Microsoft.EntityFrameworkCore.Migrations;

namespace GeekText.Database.Migrations
{
    public partial class data2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "home_address3",
                schema: "public",
                table: "users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "home_address3",
                schema: "public",
                table: "users");
        }
    }
}
