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
        public string CourseShortDetail { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; } = DateTime.Now.ToString();
        [ForeignKey("CategoryId")]
        public Category CourseCategory { get; set; }
        public virtual CourseOffering CourseOffering { get; set; }
    }
}
