using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class AddQuizForLecture1012 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SectionCode",
                table: "Result");

            migrationBuilder.AddColumn<string>(
                name: "Chose",
                table: "Result",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Correct",
                table: "Result",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuestionText",
                table: "Result",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuizName",
                table: "Result",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Wrong1",
                table: "Result",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Wrong2",
                table: "Result",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Wrong3",
                table: "Result",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Chose",
                table: "Result");

            migrationBuilder.DropColumn(
                name: "Correct",
                table: "Result");

            migrationBuilder.DropColumn(
                name: "QuestionText",
                table: "Result");

            migrationBuilder.DropColumn(
                name: "QuizName",
                table: "Result");

            migrationBuilder.DropColumn(
                name: "Wrong1",
                table: "Result");

            migrationBuilder.DropColumn(
                name: "Wrong2",
                table: "Result");

            migrationBuilder.DropColumn(
                name: "Wrong3",
                table: "Result");

            migrationBuilder.AddColumn<string>(
                name: "SectionCode",
                table: "Result",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
