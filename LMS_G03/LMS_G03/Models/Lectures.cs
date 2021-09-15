using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Models
{
    public class Lectures
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string LectureId { get; set; }
        public string LectureName { get; set; }
        public string LectureDetail { get; set; }
        public string LectureDate { get; set; }
        // Dan do / btvn
        public string Description { get; set; }
        // Tai lieu cua bai hoc
        public string Document { get; set; }
        // All assignment link (only for GV)
        public string LectureFolderId { get; set; }
        public string SectionId { get; set; }
        // THam chiếu Quiz
        public string QuizId { get; set; }
        public Section Section { get; set; }
        public bool isQuiz { get; set; }
        public bool isAssignment { get; set; }
        [ForeignKey("LectureId")]
        public ICollection<AssignmentForLectures> Assignments { get; set; }
    }
}
