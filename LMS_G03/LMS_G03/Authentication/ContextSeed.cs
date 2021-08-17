using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LMS_G03.Common;

namespace LMS_G03.Authentication
{
    public static class ContextSeed
    {
        public static async Task SeedRolesAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            //Seed Roles
            await roleManager.CreateAsync(new IdentityRole(UserRoles.SystemAdmin.ToString()));
            await roleManager.CreateAsync(new IdentityRole(UserRoles.ClassAdmin.ToString()));
            await roleManager.CreateAsync(new IdentityRole(UserRoles.Teacher.ToString()));
            await roleManager.CreateAsync(new IdentityRole(UserRoles.MentorTA.ToString()));
            await roleManager.CreateAsync(new IdentityRole(UserRoles.Instructor.ToString()));
            await roleManager.CreateAsync(new IdentityRole(UserRoles.Student.ToString()));
        }

        public static async Task SeedSuperAdminAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            //Seed Default User
            var defaultUser = new User
            {
                UserName = "superadmin",
                Email = "testmail.trustme@gmail.com",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true
            };
            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                var user = await userManager.FindByEmailAsync(defaultUser.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(defaultUser, "Pa$$word@123");
                    await userManager.AddToRoleAsync(defaultUser, UserRoles.SystemAdmin.ToString());
                    await userManager.AddToRoleAsync(defaultUser, UserRoles.ClassAdmin.ToString());
                    await userManager.AddToRoleAsync(defaultUser, UserRoles.Teacher.ToString());
                    await userManager.AddToRoleAsync(defaultUser, UserRoles.MentorTA.ToString());
                    await userManager.AddToRoleAsync(defaultUser, UserRoles.Instructor.ToString());
                    await userManager.AddToRoleAsync(defaultUser, UserRoles.Student.ToString());
                }

            }
        }
    }
}
