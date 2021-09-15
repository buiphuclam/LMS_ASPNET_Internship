using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.ViewModel
{
    public class EditSectionModel
    {
        [Required(ErrorMessage = "Section ID is required")]
        public string sectionId { get; set; }
        public string sectionDocument { get; set; }
        public string sectionDescription { get; set; }
    }
}
