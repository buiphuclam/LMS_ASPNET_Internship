using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Authentication
{
    public class ResetPasswordModel
    {
        [Required(ErrorMessage = "New password is required")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Confirm new password is required")]
        [Compare("NewPassword")]
        public string ConfirmNewPassword { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
