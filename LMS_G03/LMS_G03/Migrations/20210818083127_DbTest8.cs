using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class DbTest8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Term",
                table: "CourseOffering",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SectionName",
                table: "CourseOffering",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "CoourseImg",
                table: "Course",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CourseShortName",
                table: "Course",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CategoryShortName",
                table: "Category",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SectionName",
                table: "CourseOffering");

            migrationBuilder.DropColumn(
                name: "CoourseImg",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "CourseShortName",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "CategoryShortName",
                table: "Category");

            migrationBuilder.AlterColumn<string>(
                name: "Term",
                table: "CourseOffering",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
