using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class AddQuizForLectureComplete2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lecture_Quiz_QuizId",
                table: "Lecture");

            migrationBuilder.DropIndex(
                name: "IX_Lecture_QuizId",
                table: "Lecture");

            migrationBuilder.AlterColumn<string>(
                name: "QuizId",
                table: "Lecture",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "QuizId",
                table: "Lecture",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Lecture_QuizId",
                table: "Lecture",
                column: "QuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lecture_Quiz_QuizId",
                table: "Lecture",
                column: "QuizId",
                principalTable: "Quiz",
                principalColumn: "QuizId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
