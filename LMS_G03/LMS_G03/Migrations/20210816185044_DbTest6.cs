using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class DbTest6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Users",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Degree",
                table: "Users",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UpdatedDate",
                table: "Course",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedDate",
                table: "Course",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.CreateTable(
                name: "CourseOffering",
                columns: table => new
                {
                    SectionId = table.Column<string>(nullable: false),
                    Year = table.Column<string>(nullable: true),
                    Term = table.Column<string>(nullable: true),
                    StartDate = table.Column<string>(nullable: true),
                    EndDate = table.Column<string>(nullable: true),
                    CourseId = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseOffering", x => x.SectionId);
                    table.ForeignKey(
                        name: "FK_CourseOffering_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CourseOffering_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseOffering_CourseId",
                table: "CourseOffering",
                column: "CourseId",
                unique: true,
                filter: "[CourseId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CourseOffering_Id",
                table: "CourseOffering",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseOffering");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Degree",
                table: "Users");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedDate",
                table: "Course",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Course",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
