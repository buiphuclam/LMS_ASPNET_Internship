﻿using LMS_G03.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class UserInfo
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string BirthDay { get; set; }
        public string Nationality { get; set; }
        public string LivingCity { get; set; }
        public string BirthCity { get; set; }
        [Key]
        [ForeignKey("Id")]
        public User User { get; set; }
    }
}
