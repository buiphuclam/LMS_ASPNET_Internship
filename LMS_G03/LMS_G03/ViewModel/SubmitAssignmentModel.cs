using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.ViewModel
{
    public class SubmitAssignmentModel
    {
        [Required(ErrorMessage = "UserId is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = "LectureId is required")]
        public string LectureId { get; set; }
        [Required(ErrorMessage = "File is required")]
        [DataType(DataType.Upload)]
        public IFormFile uploadFile { get; set; }
    }
}
