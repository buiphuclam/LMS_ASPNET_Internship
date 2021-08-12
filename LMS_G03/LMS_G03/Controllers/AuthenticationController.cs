using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LMS_G03.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using LMS_G03.IServices;
using LMS_G03.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace LMS_G03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private ILoginInfoService _loginInfoService;
        private IMailService _mailService;

        public AuthenticateController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration
            , ILoginInfoService loginInfoService, IMailService mailService)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _loginInfoService = loginInfoService;
            _mailService = mailService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            string sMessage = "";
            var userExists = await userManager.FindByNameAsync(registerModel.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = Message.UserAlreadyCreated });

            var mailExists = await userManager.FindByEmailAsync(registerModel.Email);
            if (mailExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = Message.VerifyMail });

            User user = new User()
            {
                Email = registerModel.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerModel.Username
            };
            //if(!(registerModel.Password.Equals(registerModel.ConfirmPassword)))
            //    return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = Message.ErrorFound, Message = "User creation failed! ConfirmPassword and Password do not match." });
            var result = await userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = "User creation failed! One or more validation errors occurred." });

            if (!user.EmailConfirmed)
            {
                MailModel oMailModel = this.GetMailObject(registerModel);
                await _mailService.SendMail(oMailModel);
                return BadRequest(new { message = Message.MailSent });
            }

            #region Send Mail
            if(result.Succeeded)
            {
                MailModel oMailModel = this.GetMailObject(registerModel);
                sMessage =  await _mailService.SendMail(oMailModel);
            }
            if (sMessage != Message.MailSent) return BadRequest(new { message = sMessage });
            else return Ok(new Response { Status = Message.Success, Message = Message.UserCreatedVerifyMail});
            #endregion

        }

        [HttpPost]
        [AllowAnonymous]
        [Route("confirmmail")]
        public async Task<IActionResult> ConfirmMail(string username)
        {
            string sMessage = await _loginInfoService.ConfirmMail(username);
            return Ok(new { message = sMessage });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            User user = new User()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        public MailModel GetMailObject(RegisterModel user)
        {
            MailModel oMailModel = new MailModel();
            oMailModel.Subject = "Mail confirmation";
            oMailModel.Body = _mailService.GetMailBody(user);
            oMailModel.ToMails = new List<string>()
            {
                user.Email
            };
            return oMailModel;
        }
    }
}
