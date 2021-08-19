using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS_G03.Migrations
{
    public partial class DbTest11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseOffering_User_Id",
                table: "CourseOffering");

            migrationBuilder.DropForeignKey(
                name: "FK_UserInfo_User_Id",
                table: "UserInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserInfo",
                table: "UserInfo");

            migrationBuilder.DropIndex(
                name: "IX_CourseOffering_Id",
                table: "CourseOffering");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CourseOffering");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "UserInfo",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TeacherId",
                table: "CourseOffering",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserInfo",
                table: "UserInfo",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_User_UserId",
                table: "User",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CourseOffering_TeacherId",
                table: "CourseOffering",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseOffering_User_TeacherId",
                table: "CourseOffering",
                column: "TeacherId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_User_UserInfo_UserId",
                table: "User",
                column: "UserId",
                principalTable: "UserInfo",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseOffering_User_TeacherId",
                table: "CourseOffering");

            migrationBuilder.DropForeignKey(
                name: "FK_User_UserInfo_UserId",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserInfo",
                table: "UserInfo");

            migrationBuilder.DropIndex(
                name: "IX_User_UserId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_CourseOffering_TeacherId",
                table: "CourseOffering");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "CourseOffering");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "UserInfo",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "CourseOffering",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserInfo",
                table: "UserInfo",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CourseOffering_Id",
                table: "CourseOffering",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseOffering_User_Id",
                table: "CourseOffering",
                column: "Id",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserInfo_User_Id",
                table: "UserInfo",
                column: "Id",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
