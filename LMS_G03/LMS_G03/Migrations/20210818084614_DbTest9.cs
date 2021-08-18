using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class DbTest9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LectureTime",
                table: "Lecture");

            migrationBuilder.DropColumn(
                name: "SectionName",
                table: "CourseOffering");

            migrationBuilder.DropColumn(
                name: "CourseShortName",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "CategoryShortName",
                table: "Category");

            migrationBuilder.AddColumn<string>(
                name: "LectureDuration",
                table: "Lecture",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SectionCode",
                table: "CourseOffering",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CourseCode",
                table: "Course",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CategoryCode",
                table: "Category",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LectureDuration",
                table: "Lecture");

            migrationBuilder.DropColumn(
                name: "SectionCode",
                table: "CourseOffering");

            migrationBuilder.DropColumn(
                name: "CourseCode",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "CategoryCode",
                table: "Category");

            migrationBuilder.AddColumn<string>(
                name: "LectureTime",
                table: "Lecture",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SectionName",
                table: "CourseOffering",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CourseShortName",
                table: "Course",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CategoryShortName",
                table: "Category",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
