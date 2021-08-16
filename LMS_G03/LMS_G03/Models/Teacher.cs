using LMS_G03.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class Teacher : User
    {
        public string Degree { get; set; }
    }
}
