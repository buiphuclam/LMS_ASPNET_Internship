using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.ViewModel
{
    public class SectionModel
    {
        [Required(ErrorMessage = "Course ID is required")]
        public string CourseId { get; set; }
        [Required(ErrorMessage = "Teacher ID is required")]
        public string TeacherId { get; set; }
        [Required(ErrorMessage = "Year is required")]
        public string Year { get; set; }
        [Required(ErrorMessage = "Term is required")]
        public int Term { get; set; }
        [Required(ErrorMessage = "Start date is required")]
        public string StartDate { get; set; }
        [Required(ErrorMessage = "End date is required")]
        public string EndDate { get; set; }
        public string Document { get; set; }
        public string Description { get; set; }
    }
}
