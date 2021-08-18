using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class DbTest10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enroll_Course_CourseId",
                table: "Enroll");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Enroll",
                table: "Enroll");

            migrationBuilder.DropIndex(
                name: "IX_Enroll_CourseId",
                table: "Enroll");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Enroll");

            migrationBuilder.AddColumn<string>(
                name: "SectionId",
                table: "Enroll",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enroll",
                table: "Enroll",
                columns: new[] { "UserId", "SectionId" });

            migrationBuilder.CreateIndex(
                name: "IX_Enroll_SectionId",
                table: "Enroll",
                column: "SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enroll_CourseOffering_SectionId",
                table: "Enroll",
                column: "SectionId",
                principalTable: "CourseOffering",
                principalColumn: "SectionId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enroll_CourseOffering_SectionId",
                table: "Enroll");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Enroll",
                table: "Enroll");

            migrationBuilder.DropIndex(
                name: "IX_Enroll_SectionId",
                table: "Enroll");

            migrationBuilder.DropColumn(
                name: "SectionId",
                table: "Enroll");

            migrationBuilder.AddColumn<string>(
                name: "CourseId",
                table: "Enroll",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enroll",
                table: "Enroll",
                columns: new[] { "UserId", "CourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_Enroll_CourseId",
                table: "Enroll",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enroll_Course_CourseId",
                table: "Enroll",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "CourseId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
