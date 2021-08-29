using LMS_G03.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Authentication
{
    public class ApplicationDbContext: IdentityDbContext<User>
    {
        public DbSet<UserInfo> UserInfo { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<Enroll> Enroll { get; set; }
        public DbSet<CourseOffering> CourseOffering { get; set; }
        public DbSet<Lectures> Lecture { get; set; }
        public DbSet<AssignmentForLectures> Assignment { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
            .HasOne(a => a.UserInfo)
            .WithOne(a => a.User)
            .HasForeignKey<User>(c => c.Id);

            builder.Entity<Enroll>()
                .HasKey(e => new { e.StudentId, e.SectionId });
            builder.Entity<Enroll>()
                .HasOne(c => c.Section)
                .WithMany(i => i.isEnroll)
                .HasForeignKey(id => id.SectionId);
            builder.Entity<Enroll>()
                .HasOne(u => u.Student)
                .WithMany(e => e.Enroll)
                .HasForeignKey(uid => uid.StudentId);

            builder.Entity<AssignmentForLectures>()
                .HasKey(e => new { e.StudentId, e.LectureId, e.AssignmentFileId });
            builder.Entity<AssignmentForLectures>()
                .HasOne(c => c.Student)
                .WithMany(i => i.Submits)
                .HasForeignKey(id => id.StudentId);
            builder.Entity<AssignmentForLectures>()
                .HasOne(u => u.Lecture)
                .WithMany(e => e.Assignments)
                .HasForeignKey(uid => uid.LectureId);

            builder.Entity<Course>()
            .HasMany(c => c.CourseOfferings)
            .WithOne(e => e.Course)
            .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<CourseOffering>()
            .HasMany(c => c.Lectures)
            .WithOne(e => e.Section)
            .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Category>()
            .HasMany(c => c.Courses)
            .WithOne(e => e.Category)
            .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<User>(b =>
            {
                b.ToTable("User");
            });

            builder.Entity<IdentityUserClaim<string>>(b =>
            {
                b.ToTable("UserClaim");
            });

            builder.Entity<IdentityUserLogin<string>>(b =>
            {
                b.ToTable("UserLogin");
            });

            builder.Entity<IdentityUserToken<string>>(b =>
            {
                b.ToTable("UserToken");
            });

            builder.Entity<IdentityRole>(b =>
            {
                b.ToTable("Role");
            });

            builder.Entity<IdentityRoleClaim<string>>(b =>
            {
                b.ToTable("RoleClaim");
            });

            builder.Entity<IdentityUserRole<string>>(b =>
            {
                b.ToTable("UserRole");
            });

        }
    }
}
