using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class Questions
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string QuestionId { get; set; }
        public string QuestionText { get; set; }
        public string CourseId { get; set; }
        public Course Course { get; set; }
        public string Correct { get; set; }
        public string Wrong1 { get; set; }
        public string Wrong2 { get; set; }
        public string Wrong3 { get; set; }
        public string QuizId { get; set; }
        public Quiz Quiz { get; set; }
    }
}
