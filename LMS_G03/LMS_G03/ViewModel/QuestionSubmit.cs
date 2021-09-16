using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.ViewModel
{
    public class QuestionSubmit
    {
        public string QuestionId { get; set; }
        public string QuestionText { get; set; }
        public string CourseId { get; set; }
        public string Correct { get; set; }
        public string Wrong1 { get; set; }
        public string Wrong2 { get; set; }
        public string Chose { get; set; }
        public string Wrong3 { get; set; }
        public string QuizId { get; set; }
    }
}
