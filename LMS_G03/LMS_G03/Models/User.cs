using LMS_G03.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LMS_G03.Authentication
{
    public class User: IdentityUser
    {
        [JsonIgnore]
        public override string PasswordHash { get; set; }
        [JsonIgnore]
        public override string SecurityStamp { get; set; }
        [JsonIgnore]
        public override string ConcurrencyStamp { get; set; }
        [ForeignKey("UserId")]
        public UserInfo UserInfo { get; set; }
        [ForeignKey("StudentId")]
        public ICollection<Enroll> Enroll { get; set; }
        [ForeignKey("StudentId")]
        public ICollection<AssignmentForLectures> Submits { get; set; }
    }
}
