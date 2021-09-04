using LMS_G03.Authentication;
using LMS_G03.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class Course
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string CourseId { get; set; }
        public string CourseName { get; set; }
        public string CourseCode { get; set; }
        public string CourseShortDetail { get; set; }
        public string CreatedDate { get; set; }
        public byte[] CoourseImg { get; set; }
        // De cuong chung cua mon
        public string CourseDocument { get; set; }
        public string CourseFolderId { get; set; }
        public string UpdatedDate { get; set; }
        public string CategoryId { get; set; }
        public Category Category { get; set; }
        [ForeignKey("CourseId")]
        public ICollection<Section> Sections { get; set; }
        [ForeignKey("CourseId")]
        public ICollection<Questions> Questions { get; set; }
    }
}
