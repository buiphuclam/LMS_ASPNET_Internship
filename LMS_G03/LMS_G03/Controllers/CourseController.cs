using LMS_G03.Authentication;
using LMS_G03.Common;
using LMS_G03.Common.Helpers;
using LMS_G03.IServices;
using LMS_G03.Models;
using LMS_G03.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IUriService _uriService;

        public CourseController(ApplicationDbContext context, IUriService uriService)
        {
            _context = context;
            _uriService = uriService;
        }
        [HttpGet("getcourse")]
        public Task<IActionResult> GetCourse([FromQuery] PaginationFilter filter, string id) =>
            (id == null) ? GetAllCourse(filter) : GetCourseById(id);
        private async Task<IActionResult> GetCourseById(string id)
        {
            var course = await _context.Course.Where(a => a.CourseId.Equals(id)).FirstOrDefaultAsync();

            if (course == null)
            {
                return NotFound(new Response { Status = "404", Message = Message.NotFound, Data = course });
            }

            return Ok(new Response { Status = "200", Message = Message.Success, Data = course });
        }
        private async Task<IActionResult> GetAllCourse([FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var pagedData = await _context.Course
                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();
            var courses = await _context.Course.CountAsync();
            var pagedReponse = PageHelper.CreatePagedReponse<Course>(pagedData, validFilter, courses, _uriService, route);
            if (courses == 0)
            {
                pagedReponse.Status = "404";
                pagedReponse.Message = "Not found";
            }
            
            return Ok(pagedReponse);
        }

        [HttpPost("addcourse")]
        public async Task<IActionResult> AddCourse([FromBody] CourseModel course)
        {
            var category = await _context.Category.FindAsync(course.CategoryId);
            if (category == null)
                return NotFound(new Response { Status = "404", Message = Message.NotFound });

            string courseCode = "";
            string str = course.CourseName.ToUpper();
            str.Split(' ').ToList().ForEach(i => courseCode+=i[0]);

            Course newcourse = new Course()
            {
                CourseName = course.CourseName,
                CourseShortDetail = course.CourseShortDetail,
                CreatedDate = DateTime.Now.ToString(),
                UpdatedDate = DateTime.Now.ToString(),
                CourseCode = category.CategoryCode + courseCode + DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString(),
                CourseCategory = category
            };

            _context.Course.Add(newcourse);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = "500", Message = ex.Message });
            }

            return Ok(new Response { Status = "200", Message = Message.Success, Data = newcourse });
        }
    }
}
