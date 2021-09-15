using LMS_G03.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.ViewModel.ReturnViewModel
{
    public class ReturnSection
    {
        public Section section { get; set; }
        public string teacherName { get; set; }
        public string teacherEmail { get; set; }
    }
}
