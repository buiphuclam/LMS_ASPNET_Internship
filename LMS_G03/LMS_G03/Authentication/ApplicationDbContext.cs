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
        
        public DbSet<Category> Category { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<Enroll> Enroll { get; set; }
        public DbSet<Section> Section { get; set; }
        public DbSet<Lectures> Lecture { get; set; }
        public DbSet<AssignmentForLectures> Assignment { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<LMS_G03.Models.QuizForLecture> QuizForLecture { get; set; }
        public DbSet<LMS_G03.Models.Result> Result { get; set; }
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //builder.Ignore<IdentityUserLogin<string>>();
            //builder.Ignore<IdentityUserClaim<string>>();
            //builder.Ignore<IdentityRoleClaim<string>>();
            //builder.Ignore<IdentityUserToken<string>>();

            builder.Entity<User>()
                .Ignore(c => c.AccessFailedCount)
                .Ignore(c => c.LockoutEnabled)
                .Ignore(c => c.TwoFactorEnabled)
                .Ignore(c => c.ConcurrencyStamp)
                .Ignore(c => c.LockoutEnd)
                .ToTable("User");

            builder.Entity<IdentityRole>(b =>
            {
                b.ToTable("Role");
            });

            builder.Entity<IdentityUserRole<string>>(b =>
            {
                b.ToTable("UserRole");
            });

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
                .HasMany(c => c.Sections)
                .WithOne(e => e.Course)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Course>()
                .HasMany(c => c.Questions)
                .WithOne(e => e.Course)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Section>()
                .HasMany(c => c.Lectures)
                .WithOne(e => e.Section)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Category>()
                .HasMany(c => c.Courses)
                .WithOne(e => e.Category)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<QuizForSection>()
                .HasKey(e => new { e.StudentId, e.SectionId, e.QuizId });
            builder.Entity<QuizForSection>()
                .HasOne(c => c.Section)
                .WithMany(i => i.QuizForSection)
                .HasForeignKey(id => id.SectionId);
            builder.Entity<QuizForSection>()
                .HasOne(u => u.Student)
                .WithMany(e => e.QuizAttemp)
                .HasForeignKey(uid => uid.StudentId);
            builder.Entity<QuizForSection>()
                .HasOne(q => q.Quiz)
                .WithMany(q => q.QuizForSection)
                .HasForeignKey(id => id.QuizId);

            builder.Entity<IdentityRoleClaim<string>>(b =>
            {
                b.ToTable("RoleClaim");
            });
            builder.Entity<IdentityUserToken<string>>(b =>
            {
                b.ToTable("UserToken");
            });
            builder.Entity<IdentityUserLogin<string>>(b =>
            {
                b.ToTable("UserLogin");
            });
            builder.Entity<IdentityUserClaim<string>>(b =>
            {
                b.ToTable("UserClaim");
            });
            builder.Entity<QuizForLecture>()
        .HasKey(c => new { c.LectureId, c.StudentId });
        }

        public DbSet<LMS_G03.Models.Quiz> Quiz { get; set; }

        public DbSet<LMS_G03.Models.QuizForSection> QuizForSection { get; set; }

        public DbSet<LMS_G03.Models.Questions> Questions { get; set; }
        
    }
}
