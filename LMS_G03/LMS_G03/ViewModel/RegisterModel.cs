using LMS_G03.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Authentication
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
