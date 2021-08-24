using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class DbTest14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LectureDuration",
                table: "Lecture");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Lecture",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Document",
                table: "Lecture",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Document",
                table: "CourseOffering",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FolderId",
                table: "CourseOffering",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CourseDocument",
                table: "Course",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Lecture");

            migrationBuilder.DropColumn(
                name: "Document",
                table: "Lecture");

            migrationBuilder.DropColumn(
                name: "Document",
                table: "CourseOffering");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "CourseOffering");

            migrationBuilder.DropColumn(
                name: "CourseDocument",
                table: "Course");

            migrationBuilder.AddColumn<string>(
                name: "LectureDuration",
                table: "Lecture",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
