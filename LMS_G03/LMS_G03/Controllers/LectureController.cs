﻿using LMS_G03.Authentication;
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
    public class LectureController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public LectureController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("addlecture")]
        public async Task<IActionResult> AddLecture([FromBody] LectureModel lecture)
        {
            var section = await _context.CourseOffering.FindAsync(lecture.SectionId);
            if (section == null)
                return NotFound(new Response { Status = "404", Message = Message.NotFound });

            var noOfLecture = _context.Lecture.Where(a => a.Section.SectionId.Equals(lecture.SectionId)).Count() + 1;
            string folderName = "Lecture_" + noOfLecture.ToString() + "_" + lecture.LectureDate.ToString();

            Lectures newlecture = new Lectures()
            {
                SectionId = lecture.SectionId,
                LectureName = lecture.LectureName,
                LectureDate = lecture.LectureDate,
                LectureDetail = lecture.LectureDetail,
                Description = lecture.Description,
                Document = lecture.Document,
                Section = section,
                LectureFolderId = GoogleDriveFilesRepository.CreateFolder(folderName, section.Teacher.Email, section.SectionFolderId, "reader")
            };

            _context.Lecture.Add(newlecture);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = "500", Message = ex.Message });
            }

            return Ok(new Response { Status = "200", Message = Message.Success, Data = newlecture });
        }

        [HttpPost("submitassignment")]
        public async Task<IActionResult> SubmitAssignment([FromBody] SubmitAssignmentModel submit)
        {
            var lecture = await _context.Lecture.FindAsync(submit.LectureId);
            var user = await _context.Users.FindAsync(submit.UserId);
            if (lecture == null || user == null)
                return NotFound(new Response { Status = "404", Message = Message.NotFound });

            AssignmentForLectures assignment = new AssignmentForLectures()
            {
                StudentId = user.Id,
                Student = user,
                LectureId = lecture.LectureId,
                Lecture = lecture,
                AssignmentFileId = GoogleDriveFilesRepository.UploadFileInFolder(lecture.LectureFolderId, submit.FilePath)
            };

            _context.Assignment.Add(assignment);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = "500", Message = ex.Message });
            }

            return Ok(new Response { Status = "200", Message = Message.Success, Data = assignment });
        }
    }
}