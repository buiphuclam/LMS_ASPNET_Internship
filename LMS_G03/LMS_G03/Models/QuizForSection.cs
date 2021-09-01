using LMS_G03.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class QuizForSection
    {
        public string SectionId { get; set; }
        public Section Section { get; set; }
        public string QuizId { get; set; }
        public Quiz Quiz { get; set; }
        public string StudentId { get; set; }
        public User Student { get; set; }
        public double QuizScore { get; set; }
        public string QuizStartDateTime { get; set; }
        public string QuizEndDateTime { get; set; }
    }
}
