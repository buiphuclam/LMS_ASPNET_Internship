﻿using LMS_G03.Authentication;
using LMS_G03.Common;
using LMS_G03.IServices;
using LMS_G03.Models;
using LMS_G03.ViewModel;
using LMS_G03.ViewModel.ReturnViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LectureController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private IVerifyJwtService _verifyJwtService;
        public LectureController(ApplicationDbContext context, UserManager<User> userManager,
            IConfiguration configuration, IVerifyJwtService verifyJwtService)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
            _verifyJwtService = verifyJwtService;
        }

        [HttpPost("addlecture")]
        public async Task<IActionResult> AddLecture([FromBody] LectureModel lecture)
        {
            var section = await _context.Section.FindAsync(lecture.SectionId.Trim());
            if (section == null)
                return NotFound(new Response { Status = 404, Message = Message.NotFound });

            var teacher = await _userManager.FindByIdAsync(section.TeacherId.Trim());
            if (teacher == null)
                return NotFound(new Response { Status = 404, Message = Message.NotFound });

            var noOfLecture = _context.Lecture.Where(a => a.Section.SectionId.Equals(lecture.SectionId)).Count() + 1;
            string folderName = "Lecture_" + noOfLecture.ToString() + "_" + lecture.LectureDate.ToString();

            Lectures newlecture = new Lectures()
            {
                SectionId = lecture.SectionId.Trim(),
                LectureName = lecture.LectureName.Trim(),
                LectureDate = lecture.LectureDate.Trim(),
                LectureDetail = lecture.LectureDetail.Trim(),
                Description = lecture.Description.Trim(),
                Document = lecture.Document.Trim(),
                isAssignment = lecture.isAssignment,
                isQuiz = lecture.isQuiz,
                Section = section,
                LectureFolderId = GoogleDriveFilesRepository.CreateFolder(folderName, teacher.Email, section.SectionFolderId, "reader")
            };

            _context.Lecture.Add(newlecture);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = newlecture });
        }

        [HttpPost("editlecture")]
        public async Task<IActionResult> EditLecture([FromBody] LectureModel lecture)
        {
            var targetLecture = await _context.Lecture.FindAsync(lecture.LectureId.Trim());
            if (targetLecture == null)
                return NotFound(new Response { Status = 404, Message = Message.NotFound });

            targetLecture.LectureName = lecture.LectureName.Trim();
            targetLecture.LectureDetail = lecture.LectureDetail.Trim();
            targetLecture.Description = lecture.Description.Trim();
            targetLecture.Document = lecture.Document.Trim();
            targetLecture.isAssignment = lecture.isAssignment;
            targetLecture.isQuiz = lecture.isQuiz;

            try
            {
                _context.Lecture.Update(targetLecture);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = targetLecture });
        }

        [HttpPost("getlecture")]
        public async Task<IActionResult> GetLecture([FromBody] string sectionId)
        {
            ReturnSection thisSection = new ReturnSection();
            try
            {
                var s = await _context.Section.FindAsync(sectionId.Trim());
                thisSection.section = s;
                thisSection.section.Lectures = await _context.Lecture.Where(a => a.SectionId.Equals(sectionId.Trim()))
                                                            .OrderBy(a => a.LectureDate).ToListAsync();
                var teacherLastName = await _context.User.Where(a => a.Id.Equals(thisSection.section.TeacherId))
                                                        .Select(n => n.LastName).FirstOrDefaultAsync();
                var teacherFirstName = await _context.User.Where(a => a.Id.Equals(thisSection.section.TeacherId))
                                                        .Select(n => n.FirstName).FirstOrDefaultAsync();
                thisSection.teacherName = teacherLastName + " " + teacherFirstName;
                thisSection.teacherEmail = await _context.User.Where(a => a.Id.Equals(thisSection.section.TeacherId))
                                                        .Select(n => n.Email).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = thisSection });
        }

        [HttpPost("submitassignment")]
        public async Task<IActionResult> SubmitAssignment([FromForm] SubmitAssignmentModel submit)
        {
            var jwt = Request.Cookies["jwt"];
            var token = _verifyJwtService.Verify(jwt, _configuration["JWT:Secret"]);
            User user = await _userManager.FindByIdAsync(token.Issuer);
            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = 404, Message = Message.InvalidUser });

            var lecture = await _context.Lecture.FindAsync(submit.LectureId.Trim());
            if (lecture == null)
                return NotFound(new Response { Status = 404, Message = Message.NotFound });

            AssignmentForLectures assignment = await _context.Assignment
                                            .Where(a => (a.LectureId == lecture.LectureId) && (a.StudentId == user.Id))
                                            .FirstOrDefaultAsync();
            if(assignment == null || assignment.AssignmentFileId.Equals(null))
            {
                assignment = new AssignmentForLectures()
                {
                    StudentId = user.Id,
                    Student = user,
                    LectureId = lecture.LectureId,
                    Lecture = lecture,
                    AssignmentFileId = GoogleDriveFilesRepository
                        .UploadFileInFolder(lecture.LectureFolderId, submit.uploadFile, submit.Comments)
                };
            }
            else
            {
                assignment.AssignmentFileId = GoogleDriveFilesRepository
                    .ReplaceFileInFolder(assignment.AssignmentFileId, lecture.LectureFolderId, submit.uploadFile, submit.Comments);
            }

            if (!assignment.AssignmentFileId.Equals(null))
            {
                try
                {
                    _context.Assignment.Add(assignment);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return BadRequest(new Response { Status = 500, Message = ex.Message });
                }
                return Ok(new Response { Status = 200, Message = Message.Success });
            }
            else
            {
                return BadRequest(new Response { Status = 500, Message = Message.ErrorFound });
            }
        }
    }
}
