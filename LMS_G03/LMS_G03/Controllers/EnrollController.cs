using LMS_G03.Authentication;
using LMS_G03.Common;
using LMS_G03.Models;
using LMS_G03.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EnrollController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("enroll")]
        public async Task<IActionResult> Enroll([FromBody] EnrollModel enroll)
        {

            var student = await _context.Users.FindAsync(enroll.UserId);
                
            var courseSection = await _context.Section.FindAsync(enroll.SectionId);
            if( student == null || courseSection == null)
                return BadRequest(new Response { Status = 400, Message = "UserId or SectionId Not Found" });
            var findExistEnroll =  _context.Enroll.Where(s => s.SectionId == enroll.SectionId && s.StudentId == enroll.UserId).ToList();
            if(findExistEnroll.Count > 0)
                return BadRequest(new Response { Status = 400, Message = "Fail! Student has already registered" });
   
            Enroll newEnroll = new Enroll()
            {
                SectionId = enroll.SectionId,
                Section = courseSection,
                StudentId = enroll.UserId,
                Student = student,
                EnrollDate = DateTime.Now.ToString("yyyy-MM-dd")
            };

            await _context.Enroll.AddAsync(newEnroll);
            courseSection.isEnroll.Add(newEnroll);
            student.Enroll.Add(newEnroll);
            try
            { 
            await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new Response { Status = 400, Message = "Enroll Failed ! Please try again" });
            }
            return Ok(new Response { Status = 200, Message = Message.Success, Data = student });
        }
    }
}
