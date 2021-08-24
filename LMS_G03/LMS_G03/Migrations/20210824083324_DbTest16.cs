using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class DbTest16 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lecture_Course_CourseId",
                table: "Lecture");

            migrationBuilder.DropIndex(
                name: "IX_Lecture_CourseId",
                table: "Lecture");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Lecture");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "CourseOffering");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Course");

            migrationBuilder.AddColumn<string>(
                name: "LectureFolderId",
                table: "Lecture",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SectionId",
                table: "Lecture",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SectionFolderId",
                table: "CourseOffering",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CourseFolderId",
                table: "Course",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Lecture_SectionId",
                table: "Lecture",
                column: "SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lecture_CourseOffering_SectionId",
                table: "Lecture",
                column: "SectionId",
                principalTable: "CourseOffering",
                principalColumn: "SectionId",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lecture_CourseOffering_SectionId",
                table: "Lecture");

            migrationBuilder.DropIndex(
                name: "IX_Lecture_SectionId",
                table: "Lecture");

            migrationBuilder.DropColumn(
                name: "LectureFolderId",
                table: "Lecture");

            migrationBuilder.DropColumn(
                name: "SectionId",
                table: "Lecture");

            migrationBuilder.DropColumn(
                name: "SectionFolderId",
                table: "CourseOffering");

            migrationBuilder.DropColumn(
                name: "CourseFolderId",
                table: "Course");

            migrationBuilder.AddColumn<string>(
                name: "CourseId",
                table: "Lecture",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FolderId",
                table: "CourseOffering",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FolderId",
                table: "Course",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Lecture_CourseId",
                table: "Lecture",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lecture_Course_CourseId",
                table: "Lecture",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "CourseId",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
