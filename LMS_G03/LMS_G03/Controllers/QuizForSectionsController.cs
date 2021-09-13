using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LMS_G03.Authentication;
using LMS_G03.Models;

namespace LMS_G03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizForSectionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuizForSectionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/QuizForSections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuizForSection>>> GetQuizForSection()
        {
            return await _context.QuizForSection.ToListAsync();
        }

        // GET: api/QuizForSections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuizForSection>> GetQuizForSection(string id)
        {
            var quizForSection = await _context.QuizForSection.FindAsync(id);

            if (quizForSection == null)
            {
                return NotFound();
            }

            return quizForSection;
        }

        // PUT: api/QuizForSections/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuizForSection(string id, QuizForSection quizForSection)
        {
            if (id != quizForSection.StudentId)
            {
                return BadRequest();
            }

            _context.Entry(quizForSection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizForSectionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/QuizForSections
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<QuizForSection>> PostQuizForSection(QuizForSection quizForSection)
        {
            _context.QuizForSection.Add(quizForSection);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (QuizForSectionExists(quizForSection.StudentId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetQuizForSection", new { id = quizForSection.StudentId }, quizForSection);
        }

        // DELETE: api/QuizForSections/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<QuizForSection>> DeleteQuizForSection(string id)
        {
            var quizForSection = await _context.QuizForSection.FindAsync(id);
            if (quizForSection == null)
            {
                return NotFound();
            }

            _context.QuizForSection.Remove(quizForSection);
            await _context.SaveChangesAsync();

            return quizForSection;
        }

        private bool QuizForSectionExists(string id)
        {
            return _context.QuizForSection.Any(e => e.StudentId == id);
        }
    }
}
