using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class DbTest17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enroll_User_UserId",
                table: "Enroll");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Enroll",
                table: "Enroll");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Enroll");

            migrationBuilder.AddColumn<string>(
                name: "StudentId",
                table: "Enroll",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enroll",
                table: "Enroll",
                columns: new[] { "StudentId", "SectionId" });

            migrationBuilder.CreateTable(
                name: "Assignment",
                columns: table => new
                {
                    LectureId = table.Column<string>(nullable: false),
                    AssignmentFileId = table.Column<string>(nullable: false),
                    StudentId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assignment", x => new { x.StudentId, x.LectureId, x.AssignmentFileId });
                    table.ForeignKey(
                        name: "FK_Assignment_Lecture_LectureId",
                        column: x => x.LectureId,
                        principalTable: "Lecture",
                        principalColumn: "LectureId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Assignment_User_StudentId",
                        column: x => x.StudentId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Assignment_LectureId",
                table: "Assignment",
                column: "LectureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enroll_User_StudentId",
                table: "Enroll",
                column: "StudentId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enroll_User_StudentId",
                table: "Enroll");

            migrationBuilder.DropTable(
                name: "Assignment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Enroll",
                table: "Enroll");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Enroll");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Enroll",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enroll",
                table: "Enroll",
                columns: new[] { "UserId", "SectionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Enroll_User_UserId",
                table: "Enroll",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
