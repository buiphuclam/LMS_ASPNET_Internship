using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.ViewModel
{
    public class LectureModel
    {
        public string LectureId { get; set; }
        [Required(ErrorMessage = "Title is required")]
        public string LectureName { get; set; }
        public string LectureDetail { get; set; }
        [Required(ErrorMessage = "Start date is required")]
        public string LectureDate { get; set; }
        // Dan do / btvn
        public string Description { get; set; }
        // Tai lieu cua bai hoc
        public string Document { get; set; }
        // All assignment link (only for GV)
        public string SectionId { get; set; }
        public bool isAssignment { get; set; }
        public bool isQuiz { get; set; }
    }
}
