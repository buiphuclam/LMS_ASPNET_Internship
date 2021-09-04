using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class Quiz
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string QuizId { get; set; }
        public string QuizName { get; set; }
        public ICollection<Questions> Questions { get; set; }
        [ForeignKey("QuizId")]
        public ICollection<QuizForSection> QuizForSection { get; set; }
        public int QuizTime { get; set; }
    }
}
