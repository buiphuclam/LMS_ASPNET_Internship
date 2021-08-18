using LMS_G03.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class CourseOffering
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string SectionId { get; set; }
        public string SectionCode { get; set; }
        public string Year { get; set; }
        public int Term { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; }
        [ForeignKey("Id")]
        public User Teacher { get; set; }
    }
}
