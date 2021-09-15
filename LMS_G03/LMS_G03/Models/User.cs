using LMS_G03.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

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
        [JsonIgnore]
        public override bool TwoFactorEnabled { get; set; }
        [JsonIgnore]
        public override DateTimeOffset? LockoutEnd { get; set; }
        [JsonIgnore]
        public override bool LockoutEnabled { get; set; }
        [JsonIgnore]
        public override int AccessFailedCount { get; set; }
        [JsonIgnore]
        public override string NormalizedUserName { get; set; }
        [JsonIgnore]
        public override string NormalizedEmail { get; set; }

        [ForeignKey("StudentId")]
        public ICollection<Enroll> Enroll { get; set; }
        [ForeignKey("StudentId")]
        public ICollection<QuizForLecture> QuizForLecture { get; set; }
        [ForeignKey("StudentId")]
        public ICollection<AssignmentForLectures> Submits { get; set; }
        [ForeignKey("StudentId")]
        public ICollection<QuizForSection> QuizAttemp { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BirthDay { get; set; }
        public string Nationality { get; set; }
        public string LivingCity { get; set; }
        public string BirthCity { get; set; }
    }
}
