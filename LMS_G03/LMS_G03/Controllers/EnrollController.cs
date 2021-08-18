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
            var courseSection = await _context.CourseOffering.FindAsync(enroll.SectionId);
            Enroll newEnroll = new Enroll()
            {
                SectionId = enroll.SectionId,
                Section = courseSection,
                UserId = enroll.UserId,
                User = student,
                EnrollDate = DateTime.Now.ToString()
            };

            student.Enroll = (ICollection<Enroll>)newEnroll;
            courseSection.isEnroll = (ICollection<Enroll>)newEnroll;

            return Ok(new Response { Status = "200", Message = Message.Success, Data = student });
        }
    }
}
