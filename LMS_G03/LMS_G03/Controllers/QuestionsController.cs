using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LMS_G03.Authentication;
using LMS_G03.Models;
using LMS_G03.Common;
using LMS_G03.ViewModel;

namespace LMS_G03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet("getallquestion")]
        public async Task<ActionResult<IEnumerable<Questions>>> GetQuestions()
        {
            var questions = await _context.Questions.ToListAsync();
           return Ok(new Response { Status = 200, Message = Message.Success, Data = questions });
        }

        // GET: api/Questions
        [HttpGet("getquestionbyQuizId/{quizid}")]
        public async Task<ActionResult<IEnumerable<Questions>>> GetQuestionsByQuizId(string quizid)
        {
            var questions = await _context.Questions.Where(s => s.QuizId == quizid).Select(s=> new QuestionSubmit() { QuestionId = s.QuestionId, QuestionText = s.QuestionText, CourseId = s.CourseId, Correct = s.Correct, Wrong1 = s.Wrong1, Wrong2 = s.Wrong2, Wrong3 = s.Wrong3, QuizId = s.QuizId} ).ToListAsync();

            if (questions.Count == 0 || questions == null)
            {
                return NotFound(new Response { Status = 404, Message = "NotFound! please check QuizId" });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = questions });
        }

        [HttpGet("getquestionbyCourseIdAndQuizId/{courseid}/{quizid}")]
        // GET: getquestionbyCourseIdAndQuizId/{courseid}/{quizid}
        public async Task<ActionResult<QuestionModel>> GetQuestionsByCourseAndQuiz(string courseid,string quizid)
        {
            var questions = await _context.Questions.Where(s => s.CourseId == courseid && s.QuizId == quizid).ToListAsync();

            if (questions.Count == 0 || questions == null)
            {
                return NotFound(new Response { Status = 404, Message = "NotFound! please check CourseId and QuizId" });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = questions });
        }
        // GET: api/Questions/5
        [HttpGet("getquestionbyid/{id}")]
        public async Task<ActionResult<Questions>> GetQuestions(string id)
        {
            var questions = await _context.Questions.FindAsync(id);

            if (questions == null)
            {
                return NotFound(new Response { Status = 404, Message = "QuestionId Not Found" });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = questions });
        }

        // PUT: api/Questions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("updatequestion")]
        public async Task<IActionResult> PutQuestions([FromBody]QuestionModel questions)
        {
            if(questions.QuestionText == null || questions.Correct == null|| questions.Wrong1 == null || questions.Wrong2 == null || questions.Wrong3 == null || questions.CourseId == null )
                return BadRequest(new Response { Status = 400, Message = "QuestionText, Correct, Wrong1, Wrong2, Wrong3, CourseId Not Null!" });
            if(questions.Correct == questions.Wrong1 || questions.Correct == questions.Wrong2 || questions.Correct == questions.Wrong3
                || questions.Wrong1 == questions.Wrong2 || questions.Wrong1 == questions.Wrong3 || questions.Wrong2 == questions .Wrong3)
                return BadRequest(new Response { Status = 400, Message = "Answers cannot be repeated" });

            var findquestion = await _context.Questions.FindAsync(questions.QuestionId);
            if (findquestion == null)
            {
                return NotFound(new Response { Status = 404, Message = "QuestionId Not Exits" });
            }
            try
            {
                findquestion.QuestionText = questions.QuestionText;
                findquestion.Correct = questions.Correct;
                findquestion.Wrong1 = questions.Wrong1;
                findquestion.Wrong2 = questions.Wrong2;
                findquestion.Wrong3 = questions.Wrong3;
                findquestion.CourseId = questions.CourseId;
                findquestion.QuizId = questions.QuizId;
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new Response { Status = 400, Message = "Update Failed, please check CourseId or QuizId!" });
            }
            return Ok(new Response { Status = 200, Message = "Updated", Data = questions });
        }

        // POST: api/Questions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("addquestion")]
        public async Task<ActionResult<QuestionModel>> PostQuestions(QuestionModel questions)
        {
            if(questions.QuestionText == null || questions.Correct == null|| questions.Wrong1 == null || questions.Wrong2 == null || questions.Wrong3 == null || questions.CourseId == null )
                return BadRequest(new Response { Status = 400, Message = "QuestionText, Correct, Wrong1, Wrong2, Wrong3, CourseId Not Null!" });
            if(questions.Correct == questions.Wrong1 || questions.Correct == questions.Wrong2 || questions.Correct == questions.Wrong3
                || questions.Wrong1 == questions.Wrong2 || questions.Wrong1 == questions.Wrong3 || questions.Wrong2 == questions .Wrong3)
                return BadRequest(new Response { Status = 400, Message = "Answers cannot be repeated" });
            var newquestion = new Questions();
            newquestion.QuestionText = questions.QuestionText;
            newquestion.Correct = questions.Correct;
            newquestion.Wrong1 = questions.Wrong1;
            newquestion.Wrong2 = questions.Wrong2;
            newquestion.Wrong3 = questions.Wrong3;
            newquestion.CourseId = questions.CourseId;
            newquestion.QuizId = questions.QuizId;
            _context.Questions.Add(newquestion);
            try
            {
                await _context.SaveChangesAsync();
                questions.QuestionId = newquestion.QuestionId;
            }
            catch
            {
                return BadRequest(new Response { Status = 400, Message = "Insert Failed, please check CourseId & QuizId!" });
            }

            return Ok(new Response { Status = 200, Message = "Inserted", Data = questions });
        }

        // DELETE: api/Questions/5
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Questions>> DeleteQuestions(string id)
        {
            var questions = await _context.Questions.FindAsync(id);
            if (questions == null)
            {
                return BadRequest(new Response { Status = 400, Message = "QuestionId not Found" });
            }

            _context.Questions.Remove(questions);
            await _context.SaveChangesAsync();

            return questions;
        }

        private bool QuestionsExists(string id)
        {
            return _context.Questions.Any(e => e.QuestionId == id);
        }
    }
}
