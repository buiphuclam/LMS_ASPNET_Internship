using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class AddQuizForLectureComplete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LectureId",
                table: "Result",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentId",
                table: "Result",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LectureId",
                table: "Result");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Result");
        }
    }
}
