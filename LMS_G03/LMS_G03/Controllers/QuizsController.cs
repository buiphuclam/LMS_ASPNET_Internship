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
    public class QuizsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuizsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Quizs
        [HttpGet("getallquizs")]
        public async Task<ActionResult<IEnumerable<QuizModel>>> GetQuiz()
        {
            var quiz = await _context.Quiz.Select(s => new QuizModel { QuizId = s.QuizId, QuizName = s.QuizName,QuizTime = s.QuizTime }).ToListAsync();
            return Ok(new Response { Status = 200, Message = Message.Success, Data = quiz });
            
        }

        // GET: api/Quizs/5
        [HttpGet("getquiz/{id}")]
        public async Task<ActionResult<Quiz>> GetQuiz(string id)
        {
            //var quiz = await _context.Quiz.FindAsync(id);

            var quiz = await _context.Quiz.Where(s => s.QuizId == id).Select(s=> new { s.QuizId,s.QuizName,s.QuizTime} ).ToListAsync();
                                      
            if (quiz == null || quiz.Count == 0)
            {
                return NotFound(new Response { Status = 404, Message = Message.NotFound } );
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = quiz });
        }

        // PUT: api/Quizs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("editQuiz")]
        public async Task<IActionResult> PutQuiz([FromBody] QuizModel quiz)
        {
            var findquiz = await _context.Quiz.FindAsync(quiz.QuizId);
            if (findquiz == null)
            {
                return NotFound(new Response { Status = 404, Message = "QuizId Not Exits" });
            }
            try
            {
                findquiz.QuizName = quiz.QuizName;
                findquiz.QuizTime = quiz.QuizTime;
                await _context.SaveChangesAsync();
               
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new Response { Status = 400, Message = "Update Failed, please try again!" });
            }
            return Ok(new Response { Status = 200, Message = "Updated", Data = quiz });
        }

        // POST: api/Quizs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("addquiz")]
        public async Task<ActionResult<QuizModel>> PostQuiz([FromBody] QuizModel quiz)
        {
            var newquiz = new Quiz();
            newquiz.QuizName = quiz.QuizName;
            newquiz.QuizTime = quiz.QuizTime;
            _context.Quiz.Add(newquiz);
            try
            {
                await _context.SaveChangesAsync();
                quiz.QuizId = newquiz.QuizId;
            }
            catch
            {
                return BadRequest(new Response { Status = 400, Message = "Insert Failed, please try again!"});
            }

            return Ok(new Response { Status = 200, Message = "Inserted", Data = quiz });
        }

        // DELETE: api/Quizs/5
        [HttpDelete("deletequiz/{id}")]
        public async Task<ActionResult<Quiz>> DeleteQuiz(string id)
        {
            var quiz = await _context.Quiz.FindAsync(id);
            if (quiz == null)
            {
               return NotFound(new Response { Status = 400, Message = "QuizId Not Exits" });
            }

            _context.Quiz.Remove(quiz);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new Response { Status = 400, Message = "Delete Failed, please try again!" });
            }
            

            return Ok(new Response { Status = 200, Message = "Deleted", Data = quiz });
        }

        private bool QuizExists(string id)
        {
            return _context.Quiz.Any(e => e.QuizId == id);
        }
    }
}
