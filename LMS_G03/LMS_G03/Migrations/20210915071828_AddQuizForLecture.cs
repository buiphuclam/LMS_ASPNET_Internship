using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class AddQuizForLecture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuizId",
                table: "Lecture",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuizId",
                table: "Lecture");
        }
    }
}
