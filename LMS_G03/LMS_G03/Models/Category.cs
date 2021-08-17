using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryShortDetail { get; set; }
        public ICollection<Course> Courses { get; set; }
    }
}
