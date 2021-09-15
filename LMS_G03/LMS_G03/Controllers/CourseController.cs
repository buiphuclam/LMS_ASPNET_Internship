using LMS_G03.Authentication;
using LMS_G03.Common;
using LMS_G03.Common.Helpers;
using LMS_G03.IServices;
using LMS_G03.Models;
using LMS_G03.ViewModel;
using LMS_G03.ViewModel.ReturnViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private IVerifyJwtService _verifyJwtService;
        public CourseController(ApplicationDbContext context, IUriService uriService, UserManager<User> userManager,
            IConfiguration configuration, IVerifyJwtService verifyJwtService)
        {
            _context = context;
            _uriService = uriService;
            _userManager = userManager;
            _configuration = configuration;
            _verifyJwtService = verifyJwtService;
        }

        [HttpGet("getcourse")]
        public Task<IActionResult> GetCourse([FromQuery] PaginationFilter filter, string id) =>
            (id == null) ? GetAllCourse(filter) : GetCourseById(id);
        private async Task<IActionResult> GetCourseById(string id)
        {
            var course = await _context.Course.Where(a => a.CourseId.Equals(id)).FirstOrDefaultAsync();

            if (course == null)
            {
                return NotFound(new Response { Status = 404, Message = Message.NotFound, Data = course });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = course });
        }
        private async Task<IActionResult> GetAllCourse([FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var pagedData = await _context.Course
                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();
            var count = await _context.Course.CountAsync();
            var pagedReponse = PageHelper.CreatePagedReponse<Course>(pagedData, validFilter, count, _uriService, route);
            if (count == 0)
            {
                pagedReponse.Status = 404;
                pagedReponse.Message = "Not found";
            }
            
            return Ok(pagedReponse);
        }

        [HttpPost("addcourse")]
        public async Task<IActionResult> AddCourse([FromBody] CourseModel course)
        {
            var category = await _context.Category.FindAsync(course.CategoryId);
            if (category == null)
                return NotFound(new Response { Status = 404, Message = Message.NotFound });

            string courseCode = "";
            string str = course.CourseName.ToUpper();
            str.Split(' ').ToList().ForEach(i => courseCode+=i[0]);

            courseCode = category.CategoryCode + DateTime.Now.Year.ToString() + "_" + courseCode;

            Course newcourse = new Course()
            {
                CourseName = course.CourseName,
                CourseShortDetail = course.CourseShortDetail,
                CourseDocument = course.CourseDocument,
                CoourseImg = course.CoourseImg,
                CreatedDate = DateTime.Now.ToString("yyyy-MM-dd"),
                UpdatedDate = DateTime.Now.ToString("yyyy-MM-dd"),
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
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }
            return Ok(new Response { Status = 200, Message = Message.Success, Data = newcourse });
        }
        [HttpPost("editcourse")]
        public async Task<IActionResult> EditCourse([FromBody] CourseModel course, string courseId)
        {
            var coursee = await _context.Course.FindAsync(courseId);

            coursee.CoourseImg = course.CoourseImg;
            coursee.CourseDocument = course.CourseDocument;
            coursee.CourseShortDetail = course.CourseShortDetail;
            coursee.UpdatedDate = DateTime.Now.ToString("yyyy-MM-dd");

            _context.Course.Update(coursee);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }
            return Ok(new Response { Status = 200, Message = Message.Success, Data = coursee });
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
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }
            return Ok(new Response { Status = 200, Message = Message.Success });
        }

        [HttpPost("addsection")]
        public async Task<IActionResult> AddSection([FromBody] SectionModel section)
        {
            var course = await _context.Course.FindAsync(section.CourseId);
            var teacher = await _context.Users.FindAsync(section.TeacherId);
            if (course == null || teacher == null)
                return NotFound(new Response { Status = 404, Message = Message.NotFound });

            var noOfClass = _context.Section.Where(a => a.Course.CourseId.Equals(section.CourseId)).Count() + 1;
            string sectionCode = course.CourseCode + "_" + section.Year + "_" + section.Term + "_" + noOfClass.ToString();

            Section newclass = new Section()
            {
                SectionCode = sectionCode,
                SectionName = course.CourseName,
                Year = section.Year,
                Term = section.Term,
                StartDate = section.StartDate,
                EndDate = section.EndDate,
                Document = section.Document,
                Description = section.Description,
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
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }
            
            return Ok(new Response { Status = 200, Message = Message.Success, Data = newclass });
        }
        [HttpPost("editsection")]
        public async Task<IActionResult> EditSection([FromBody] EditSectionModel section)
        {
            var sectionn = await _context.Section.FindAsync(section.sectionId);

            sectionn.Document = section.sectionDocument;
            sectionn.Description = section.sectionDescription;
            _context.Section.Update(sectionn);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }
            return Ok(new Response { Status = 200, Message = Message.Success, Data = sectionn });
        }

        [HttpGet("getsection")]
        public async Task<IActionResult> GetSection([FromQuery] string courseId)
        {
            List<Section> sections;

            try
            {
                sections = await _context.Section.Where(s => s.CourseId.Equals(courseId)).ToListAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = sections });
        }

        [HttpDelete("deletesection")]
        public async Task<IActionResult> DeleteSection([FromQuery] string sectionId)
        {
            var sectionn = await _context.Section.FindAsync(sectionId);

            _context.Section.Remove(sectionn);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }

            return Ok(new Response { Status = 200, Message = Message.Success });
        }

        [HttpGet("mycourse")]
        public async Task<IActionResult> MyCourse([FromQuery] PaginationFilter filter)
        {
            var jwt = Request.Cookies["jwt"];
            var token = _verifyJwtService.Verify(jwt, _configuration["JWT:Secret"]);
            User user = await _userManager.FindByIdAsync(token.Issuer);
            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = 404, Message = Message.InvalidUser });

            var result = await _userManager.IsInRoleAsync(user, UserRoles.Student);
            if (result)
            {
                return await GetStudentCourses(filter, user);
            }
            else
            {
                result = await _userManager.IsInRoleAsync(user, UserRoles.Teacher);
                if (result)
                {
                    return await GetTeacherCourses(filter, user);
                }
                else return Unauthorized();
            }
        }

        private async Task<IActionResult> GetTeacherCourses(PaginationFilter filter, User user)
        {
            //var count = pagedData.Count();
            int totalRecoreds = await _context.Section.Where(a => a.TeacherId.Equals(user.Id)).CountAsync();

            if (totalRecoreds == 0)
                return NotFound(new Response { Status = 404, Message = Message.NotFound, Data = null });

            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var pagedData = await _context.Section
                .Where(a => a.TeacherId.Equals(user.Id))
                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();

            var pagedReponse = PageHelper.CreatePagedReponse<Section>(pagedData, validFilter, totalRecoreds, _uriService, route);

            return Ok(pagedReponse);
        }

        private async Task<IActionResult> GetStudentCourses(PaginationFilter filter, User user)
        {
            //var count = pagedData.Count();
            int totalRecoreds = await _context.Enroll.Where(a => a.StudentId.Equals(user.Id)).CountAsync();

            if (totalRecoreds == 0)
                return NotFound(new Response { Status = 404, Message = Message.NotFound, Data = null });

            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var pagedData = await _context.Enroll
                .Where(a => a.StudentId.Equals(user.Id))
                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();

            List<Section> mycourses = new List<Section>();
            foreach (var enroll in pagedData)
            {
                var section = _context.Section.Where(a => a.SectionId.Equals(enroll.SectionId)).FirstOrDefault();
                section.Teacher = await _context.User.FindAsync(section.TeacherId);
                //section.Course = await _context.Course.FindAsync(section.CourseId);
                mycourses.Add(section);
            }

            var pagedReponse = PageHelper.CreatePagedReponse<Section>(mycourses, validFilter, totalRecoreds, _uriService, route);

            return Ok(pagedReponse);
        }

        [HttpGet("statistic")]
        public async Task<IActionResult> Statistic([FromQuery] PaginationFilter filter)
        {
            var jwt = Request.Cookies["jwt"];
            var token = _verifyJwtService.Verify(jwt, _configuration["JWT:Secret"]);
            User user = await _userManager.FindByIdAsync(token.Issuer);
            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = 404, Message = Message.InvalidUser });

            //var count = pagedData.Count();
            int totalRecoreds = await _context.Enroll.Where(a => a.StudentId.Equals(user.Id)).CountAsync();
            if (totalRecoreds == 0)
                return NotFound(new Response { Status = 404, Message = Message.NotFound, Data = null });

            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var pagedData = await _context.Enroll
                .Where(a => a.StudentId.Equals(user.Id))
                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();

            List<ReturnStatistic> mycourses = new List<ReturnStatistic>();
            for(int i = 0; i < pagedData.Count(); i++)
            {
                mycourses.Add(new ReturnStatistic { enroll = pagedData[i], 
                    sectionName = await _context.Section.Where(a => a.SectionId.Equals(pagedData[i].SectionId))
                                                        .Select(n => n.SectionName).FirstOrDefaultAsync()
                                                   });
            }

            var pagedReponse = PageHelper.CreatePagedReponse<ReturnStatistic>(mycourses, validFilter, totalRecoreds, _uriService, route);
            //if (count == 0)
            //{
            //    pagedReponse.Status = 404;
            //    pagedReponse.Message = "Not found";
            //}

            return Ok(pagedReponse);
        }
    }
}
