using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.ViewModel
{
    public class ResultSubmit
    {

        public string QuizName { get; set; }
        public int  TotalQuestions { get; set; }
        public int NumberOfCorrect { get; set; }
        public double Mark { get; set; }
    }
}
