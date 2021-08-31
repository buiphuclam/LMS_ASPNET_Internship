using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.ViewModel
{
    public class CourseModel
    {
        [Required(ErrorMessage = "Course name is required")]
        public string CourseName { get; set; }
        [Required(ErrorMessage = "Course short detail is required")]
        public string CourseShortDetail { get; set; }
        public string CategoryId { get; set; }
        public string CourseDocument { get; set; }
        public byte[] CoourseImg { get; set; }
    }
}
