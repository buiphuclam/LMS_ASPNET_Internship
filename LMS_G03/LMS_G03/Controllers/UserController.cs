using LMS_G03.Authentication;
using LMS_G03.Common;
using LMS_G03.IServices;
using LMS_G03.ViewModel;
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
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private IVerifyJwtService _verifyJwtService;
        private readonly IConfiguration _configuration;

        public UserController(ApplicationDbContext context, UserManager<User> userManager, 
            RoleManager<IdentityRole> roleManager, IVerifyJwtService verifyJwtService, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _verifyJwtService = verifyJwtService;
            _configuration = configuration;
        }

        [HttpGet("getuser/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
           
            if (user == null)
            {
                return NotFound(new Response { Status = 404, Message = Message.InvalidUser });
            }
            //user.UserInfo = await _context.UserInfo.FindAsync(id);
            return Ok(new Response { Status = 200, Message = Message.Success, Data = user });
        }

        [HttpGet("getteacher")]
        public async Task<IActionResult> GetTeacher()
        {
            var teachers = await _userManager.GetUsersInRoleAsync(UserRoles.Teacher);

            if (teachers == null)
            {
                return NotFound(new Response { Status = 404, Message = Message.NotFound });
            }
            //user.UserInfo = await _context.UserInfo.FindAsync(id);
            return Ok(new Response { Status = 200, Message = Message.Success, Data = teachers });
        }

        [HttpPost]
        [Route("user/updateprofile")]
        public async Task<IActionResult> UpdateProfile([FromBody] ProfileModel profile)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _verifyJwtService.Verify(jwt, _configuration["JWT:Secret"]);
                var user = await _userManager.FindByIdAsync(token.Issuer);
                if (user == null)
                    return StatusCode(StatusCodes.Status404NotFound, new Response { Status = 404, Message = Message.InvalidUser });

                user.FirstName = profile.FirstName;
                user.LastName = profile.LastName;
                user.BirthDay = profile.BirthDay;
                user.Nationality = profile.Nationality;
                user.LivingCity = profile.LivingCity;
                user.BirthCity = profile.BirthCity;
                user.PhoneNumber = profile.PhoneNumber;

                await _userManager.UpdateAsync(user);

                return Ok(new Response { Status = 200, Message = Message.Success, Data = user });
            }
            catch (Exception ex)
            {
                return Unauthorized(ex);
            }
        }
    }
}
