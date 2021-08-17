using LMS_G03.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class Enroll
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public string CourseId { get; set; }
        public Course Course { get; set; }
        public string EnrollDate { get; set; }
    }
}
