using LMS_G03.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class Enroll
    {
        public string StudentId { get; set; }
        public User Student { get; set; }
        public string SectionId { get; set; }
        public Section Section { get; set; }
        public string EnrollDate { get; set; }
        public double TotalScore { get; set; }
    }
}
