
using LMS_G03.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class QuizForLecture
    {
        public string LectureId { get; set; }
        public Lectures Lecture { get; set; }
        public string StudentId { get; set; }
        public User Student { get; set; }
        public string QuizName { get; set; }
        public double Mark { get; set; }
    }
}
