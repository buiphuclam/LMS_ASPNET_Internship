using LMS_G03.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class AssignmentForLectures
    {
        public string LectureId { get; set; }
        public Lectures Lecture { get; set; }
        public string AssignmentFileId { get; set; }
        public string StudentId { get; set; }
        public User Student { get; set; }
        public double AssignmentScore { get; set; }
    }
}
