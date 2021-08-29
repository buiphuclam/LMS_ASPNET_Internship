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

            courseCode = category.CategoryCode + DateTime.Now.Year.ToString() + "_" + courseCode;

            Course newcourse = new Course()
            {
                CourseName = course.CourseName,
                CourseShortDetail = course.CourseShortDetail,
                CreatedDate = DateTime.Now.ToString(),
                UpdatedDate = DateTime.Now.ToString(),
                CourseCode = courseCode,
                Category = category,
                CourseFolderId = GoogleDriveFilesRepository.CreateFolder(courseCode, "testmail.trustme@gmail.com", "root", "writer")
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
        [HttpPost("editcourse")]
        public async Task<IActionResult> EditCourse([FromBody] CourseModel course, string courseId)
        {
            var coursee = await _context.Course.FindAsync(courseId);

            coursee.CoourseImg = course.CoourseImg;
            coursee.CourseDocument = course.CourseDocument;
            coursee.CourseShortDetail = course.CourseShortDetail;
            coursee.UpdatedDate = DateTime.Now.ToString();

            _context.Course.Update(coursee);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = "500", Message = ex.Message });
            }
            return Ok(new Response { Status = "200", Message = Message.Success, Data = coursee });
        }
        [HttpPost("deletecourse")]
        public async Task<IActionResult> DeleteCourse([FromBody] string courseId)
        {
            var coursee = await _context.Course.FindAsync(courseId);

            _context.Course.Remove(coursee);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = "500", Message = ex.Message });
            }
            return Ok(new Response { Status = "200", Message = Message.Success });
        }

        [HttpPost("addsection")]
        public async Task<IActionResult> AddSection([FromBody] SectionModel section)
        {
            var course = await _context.Course.FindAsync(section.CourseId);
            var teacher = await _context.Users.FindAsync(section.TeacherId);
            if (course == null || teacher == null)
                return NotFound(new Response { Status = "404", Message = Message.NotFound });

            var noOfClass = _context.Section.Where(a => a.Course.CourseId.Equals(section.CourseId)).Count() + 1;
            string sectionCode = course.CourseCode + "_" + section.Year + "_" + section.Term + "_" + noOfClass.ToString();

            Section newclass = new Section()
            {
                SectionCode = sectionCode,
                Year = section.Year,
                Term = section.Term,
                StartDate = section.StartDate,
                EndDate = section.EndDate,
                Course = course,
                Teacher = teacher,
                isEnroll = null,
                SectionFolderId = GoogleDriveFilesRepository.CreateFolder(sectionCode, teacher.Email, course.CourseFolderId, "writer")
            };

            _context.Section.Add(newclass);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = "500", Message = ex.Message });
            }
            
            return Ok(new Response { Status = "200", Message = Message.Success, Data = newclass });
        }
        [HttpPost("editsection")]
        public async Task<IActionResult> EditSection([FromBody] SectionModel section, string sectionId)
        {
            var sectionn = await _context.Section.FindAsync(sectionId);

            sectionn.Document = section.Document;
            _context.Section.Update(sectionn);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = "500", Message = ex.Message });
            }

            return Ok(new Response { Status = "200", Message = Message.Success, Data = sectionn });
        }
        [HttpPost("deletesection")]
        public async Task<IActionResult> DeleteSection([FromBody] string sectionId)
        {
            var sectionn = await _context.Section.FindAsync(sectionId);

            _context.Section.Remove(sectionn);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = "500", Message = ex.Message });
            }

            return Ok(new Response { Status = "200", Message = Message.Success });
        }

        [HttpGet("mycourse")]
        public async Task<IActionResult> MyCourse(string id)
        {
            var enrolls = await _context.Enroll.Where(a => a.StudentId.Equals(id)).ToListAsync();
            if(enrolls.Count() == 0)
                return NotFound(new Response { Status = "404", Message = Message.NotFound, Data = enrolls });

            List<Section> mycourses = new List<Section>();
            foreach (var enroll in enrolls)
            {
                var courseOffering = _context.Section.Where(a => a.SectionId.Equals(enroll.SectionId)).FirstOrDefault();
                mycourses.Add(courseOffering);
            }

            return Ok(new Response { Status = "200", Message = Message.Success, Data = mycourses });
        }
    }
}
