using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
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

    }
}
