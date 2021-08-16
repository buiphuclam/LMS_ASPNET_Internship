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
        public DbSet<Teacher> Teacher { get; set; }
        public DbSet<CourseOffering> CourseOffering { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Category>()
            .HasMany(c => c.Courses)
            .WithOne(e => e.CourseCategory)
            .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<User>()
            .HasDiscriminator<string>("Role")
            .HasValue<User>("Student")
            .HasValue<Teacher>("Teacher");

            builder.Entity<User>(b =>
            {
                b.ToTable("Users");
            });

            builder.Entity<IdentityUserClaim<string>>(b =>
            {
                b.ToTable("UserClaims");
            });

            builder.Entity<IdentityUserLogin<string>>(b =>
            {
                b.ToTable("UserLogins");
            });

            builder.Entity<IdentityUserToken<string>>(b =>
            {
                b.ToTable("UserTokens");
            });

            builder.Entity<IdentityRole>(b =>
            {
                b.ToTable("Roles");
            });

            builder.Entity<IdentityRoleClaim<string>>(b =>
            {
                b.ToTable("RoleClaims");
            });

            builder.Entity<IdentityUserRole<string>>(b =>
            {
                b.ToTable("UserRoles");
            });

        }
    }
}
