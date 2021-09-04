using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class DbTest32 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_Category_CategoryId",
                table: "Course");

            migrationBuilder.DropForeignKey(
                name: "FK_Lecture_Section_SectionId",
                table: "Lecture");

            migrationBuilder.DropForeignKey(
                name: "FK_Section_Course_CourseId",
                table: "Section");

            migrationBuilder.AddColumn<double>(
                name: "TotalScore",
                table: "Enroll",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AssignmentScore",
                table: "Assignment",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Quiz",
                columns: table => new
                {
                    QuizId = table.Column<string>(nullable: false),
                    QuizName = table.Column<string>(nullable: true),
                    QuizTime = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quiz", x => x.QuizId);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionId = table.Column<string>(nullable: false),
                    QuestionText = table.Column<string>(nullable: true),
                    CourseId = table.Column<string>(nullable: true),
                    Correct = table.Column<string>(nullable: true),
                    Wrong1 = table.Column<string>(nullable: true),
                    Wrong2 = table.Column<string>(nullable: true),
                    Wrong3 = table.Column<string>(nullable: true),
                    QuizId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_Questions_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Questions_Quiz_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quiz",
                        principalColumn: "QuizId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "QuizForSection",
                columns: table => new
                {
                    SectionId = table.Column<string>(nullable: false),
                    QuizId = table.Column<string>(nullable: false),
                    StudentId = table.Column<string>(nullable: false),
                    QuizScore = table.Column<double>(nullable: false),
                    QuizStartDateTime = table.Column<string>(nullable: true),
                    QuizEndDateTime = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizForSection", x => new { x.StudentId, x.SectionId, x.QuizId });
                    table.ForeignKey(
                        name: "FK_QuizForSection_Quiz_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quiz",
                        principalColumn: "QuizId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizForSection_Section_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Section",
                        principalColumn: "SectionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizForSection_User_StudentId",
                        column: x => x.StudentId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_CourseId",
                table: "Questions",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuizId",
                table: "Questions",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizForSection_QuizId",
                table: "QuizForSection",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizForSection_SectionId",
                table: "QuizForSection",
                column: "SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Category_CategoryId",
                table: "Course",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lecture_Section_SectionId",
                table: "Lecture",
                column: "SectionId",
                principalTable: "Section",
                principalColumn: "SectionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Section_Course_CourseId",
                table: "Section",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "CourseId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_Category_CategoryId",
                table: "Course");

            migrationBuilder.DropForeignKey(
                name: "FK_Lecture_Section_SectionId",
                table: "Lecture");

            migrationBuilder.DropForeignKey(
                name: "FK_Section_Course_CourseId",
                table: "Section");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "QuizForSection");

            migrationBuilder.DropTable(
                name: "Quiz");

            migrationBuilder.DropColumn(
                name: "TotalScore",
                table: "Enroll");

            migrationBuilder.DropColumn(
                name: "AssignmentScore",
                table: "Assignment");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Category_CategoryId",
                table: "Course",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Lecture_Section_SectionId",
                table: "Lecture",
                column: "SectionId",
                principalTable: "Section",
                principalColumn: "SectionId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Section_Course_CourseId",
                table: "Section",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "CourseId",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
