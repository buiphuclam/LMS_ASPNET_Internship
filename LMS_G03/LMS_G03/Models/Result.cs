using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class Result
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ResultId { get; set; }
        public string QuizName { get; set; }
        public string QuestionText { get; set; }
        public string Correct { get; set; }
        public string Wrong1 { get; set; }
        public string Wrong2 { get; set; }
        public string Wrong3 { get; set; }
        public string Chose { get; set; }
        public string LectureId { get; set; }
        public string StudentId { get; set; }
    }
}
