using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class Lectures
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string LectureId { get; set; }
        public string LectureName { get; set; }
        public string LectureDetail { get; set; }
        public string LectureDate { get; set; }
        public string LectureDuration { get; set; }
        public string CourseId { get; set; }
        public Course Course { get; set; }
    }
}
