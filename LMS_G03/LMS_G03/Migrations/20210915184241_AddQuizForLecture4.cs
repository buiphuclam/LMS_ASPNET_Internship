using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class AddQuizForLecture4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuizForLecture",
                columns: table => new
                {
                    LectureId = table.Column<string>(nullable: false),
                    StudentId = table.Column<string>(nullable: false),
                    QuizName = table.Column<string>(nullable: true),
                    Mark = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizForLecture", x => new { x.LectureId, x.StudentId });
                    table.ForeignKey(
                        name: "FK_QuizForLecture_Lecture_LectureId",
                        column: x => x.LectureId,
                        principalTable: "Lecture",
                        principalColumn: "LectureId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizForLecture_User_StudentId",
                        column: x => x.StudentId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuizForLecture_StudentId",
                table: "QuizForLecture",
                column: "StudentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuizForLecture");
        }
    }
}
