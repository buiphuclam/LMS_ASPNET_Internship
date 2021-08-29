using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class DbTest24 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enroll_CourseOffering_SectionId",
                table: "Enroll");

            migrationBuilder.DropForeignKey(
                name: "FK_Lecture_CourseOffering_SectionId",
                table: "Lecture");

            migrationBuilder.DropTable(
                name: "CourseOffering");

            migrationBuilder.CreateTable(
                name: "Section",
                columns: table => new
                {
                    SectionId = table.Column<string>(nullable: false),
                    SectionCode = table.Column<string>(nullable: true),
                    Year = table.Column<string>(nullable: true),
                    Term = table.Column<int>(nullable: false),
                    StartDate = table.Column<string>(nullable: true),
                    EndDate = table.Column<string>(nullable: true),
                    Document = table.Column<string>(nullable: true),
                    SectionFolderId = table.Column<string>(nullable: true),
                    CourseId = table.Column<string>(nullable: true),
                    TeacherId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Section", x => x.SectionId);
                    table.ForeignKey(
                        name: "FK_Section_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Section_User_TeacherId",
                        column: x => x.TeacherId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Section_CourseId",
                table: "Section",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Section_TeacherId",
                table: "Section",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enroll_Section_SectionId",
                table: "Enroll",
                column: "SectionId",
                principalTable: "Section",
                principalColumn: "SectionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lecture_Section_SectionId",
                table: "Lecture",
                column: "SectionId",
                principalTable: "Section",
                principalColumn: "SectionId",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enroll_Section_SectionId",
                table: "Enroll");

            migrationBuilder.DropForeignKey(
                name: "FK_Lecture_Section_SectionId",
                table: "Lecture");

            migrationBuilder.DropTable(
                name: "Section");

            migrationBuilder.CreateTable(
                name: "CourseOffering",
                columns: table => new
                {
                    SectionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CourseId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Document = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EndDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SectionCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SectionFolderId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TeacherId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Term = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseOffering", x => x.SectionId);
                    table.ForeignKey(
                        name: "FK_CourseOffering_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_CourseOffering_User_TeacherId",
                        column: x => x.TeacherId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseOffering_CourseId",
                table: "CourseOffering",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseOffering_TeacherId",
                table: "CourseOffering",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enroll_CourseOffering_SectionId",
                table: "Enroll",
                column: "SectionId",
                principalTable: "CourseOffering",
                principalColumn: "SectionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lecture_CourseOffering_SectionId",
                table: "Lecture",
                column: "SectionId",
                principalTable: "CourseOffering",
                principalColumn: "SectionId",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
