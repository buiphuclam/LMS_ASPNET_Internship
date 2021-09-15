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
using LMS_G03.Models;
using LMS_G03.ViewModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace LMS_G03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private IMailHelperService _mailHelperService;
        private IVerifyJwtService _verifyJwtService;
        //private readonly SignInManager<User> _signInManager;


        public AuthenticateController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration
            , IMailHelperService mailHelperService, IVerifyJwtService verifyJwtService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _mailHelperService = mailHelperService;
            _verifyJwtService = verifyJwtService;
            //_signInManager = signInManager;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            var userExists = await _userManager.FindByNameAsync(registerModel.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = 500, Message = Message.UserAlreadyCreated });

            var mailExists = await _userManager.FindByEmailAsync(registerModel.Email);
            if (mailExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = 500, Message = Message.VerifyMail });

            User user = new User()
            {
                Email = registerModel.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerModel.Username,
                //UserInfo = new UserInfo()
            };

            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = 500, Message = Message.SomethingWrong });
            else
            {
                if (!await _roleManager.RoleExistsAsync(UserRoles.Student.ToString()))
                    await _roleManager.CreateAsync(new IdentityRole(UserRoles.Student.ToString()));

                if (await _roleManager.RoleExistsAsync(UserRoles.Student.ToString()))
                {
                    await _userManager.AddToRoleAsync(user, UserRoles.Student.ToString());
                }

                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authenticate", new { token, email = registerModel.Email }, Request.Scheme);
                bool emailResponse = _mailHelperService.SendEmail(registerModel.Email, confirmationLink, "Email confirmation");

                if (emailResponse)
                    return Ok(new Response { Status = 200, Message = Message.UserCreatedVerifyMail });
                else
                {
                    return BadRequest(new Response { Status = 500, Message = Message.ErrorFound });
                }
            }
        }

        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                //var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, true, false);
                //if (signInResult.Succeeded)
                //{
                //    await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, "SystemAdmin"));
                //}

                //var tokenHandler = new JwtSecurityTokenHandler();

                var idenClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                var roleClaims = new List<Claim>();
                foreach (var userRole in userRoles)
                {
                    roleClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authClaims = idenClaims.Concat(roleClaims).ToList();

                var claimsIdentity = new ClaimsIdentity(authClaims, JwtBearerDefaults.AuthenticationScheme);
                var userPrincipal = new ClaimsPrincipal(new[] { claimsIdentity });
                
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
                var credentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256);
                var idenToken = new JwtSecurityToken(
                    issuer: user.Id,
                    expires: DateTime.Now.AddHours(24),
                    claims: authClaims.ToArray(),
                    signingCredentials: credentials
                    );
                //await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,new ClaimsPrincipal(claimsIdentity),authProperties);
                // await HttpContext.SignInAsync(userPrincipal);
                var jwt = new JwtSecurityTokenHandler().WriteToken(idenToken);

                var roleToken = new JwtSecurityToken(
                    expires: DateTime.Now.AddHours(24),
                    claims: roleClaims.ToArray(),
                    signingCredentials: credentials
                    );
                var jwt_r = new JwtSecurityTokenHandler().WriteToken(roleToken);

                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None
                });

                Response.Cookies.Append("jwt_r", jwt_r, new CookieOptions
                {
                    HttpOnly = false,
                    Secure = true,
                    SameSite = SameSiteMode.None
                });

                return Ok(new Response { Status = 200, Message = Message.Success, Data = jwt });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            //if (Request.Cookies["jwt"] != null)
            //{
            //    var jwt = Request.Cookies["jwt"];
            //    // HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            //    var token = _verifyJwtService.Verify(jwt, _configuration["JWT:Secret"]);
            //    Response.Cookies.Append("jwt", new JwtSecurityTokenHandler().WriteToken(token), new CookieOptions
            //    {
            //        HttpOnly = true,
            //        Secure = true,
            //        SameSite = SameSiteMode.None,
            //        Expires = DateTime.Now.AddDays(-1)
            //    });
            //}

            Response.Cookies.Delete("jwt", new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            Response.Cookies.Delete("jwt_r", new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            return Unauthorized();
        }

        [HttpPost]
        [Route("register-teacher")]
        public async Task<IActionResult> RegisterTeacher([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = 500, Message = Message.UserAlreadyCreated });

            User user = new User()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = 500, Message = "User creation failed! Please check user details and try again." });

            if (!await _roleManager.RoleExistsAsync(UserRoles.Teacher.ToString()))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Teacher.ToString()));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Student.ToString()))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Student.ToString()));

            if (await _roleManager.RoleExistsAsync(UserRoles.Teacher.ToString()))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Teacher.ToString());
            }

            return Ok(new Response { Status = 200, Message = Message.Success });
        }

        [HttpPost]
        [Route("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel changePasswordModel)
        {
            var userExists = await _userManager.FindByNameAsync(changePasswordModel.Username);
            if (userExists == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = 404, Message = Message.InvalidUser });

            userExists.SecurityStamp = Guid.NewGuid().ToString();
            var result = await _userManager.ChangePasswordAsync(userExists, changePasswordModel.CurrentPassword, changePasswordModel.NewPassword);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = 500, Message = Message.SomethingWrong });
            return Ok(new Response { Status = 200, Message = Message.ChangePasswordSuccess });
        }

        [HttpPost]
        [Route("forgetpassword")]
        public async Task<IActionResult> ForgotPassword(ForgetPasswordModel forgetPasswordModel)
        {
            var user = await _userManager.FindByEmailAsync(forgetPasswordModel.Email);
            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = 404, Message = Message.InvalidUser });
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            //var resetPasswordLink = Url.Action(/*nameof(ResetPassword)*/"http://localhost:3000/api/authenticate/resetpassword", "Authenticate", new { token, email = user.Email }, Request.Scheme);
            var message = "http://localhost:3000/resetpassword?email=" + user.Email + "&token=" + token;
            bool emailResponse = _mailHelperService.SendEmail(forgetPasswordModel.Email, message, "Reset password confirmation");

            if (emailResponse)
                return Ok(new Response { Status = 200, Message = Message.MailSent });
            else
            {
                return BadRequest(new Response { Status = 500, Message = Message.ErrorFound });
            }
        }

        [HttpPost]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel resetPasswordModel)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordModel.Email);
            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = 404, Message = Message.InvalidUser });
            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordModel.Token, resetPasswordModel.NewPassword);
            if (!resetPassResult.Succeeded)
            {
                return BadRequest(new Response { Status = 500, Message = Message.ErrorFound });
            }
            return Ok(new Response { Status = 200, Message = Message.ChangePasswordSuccess });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("confirmemail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var userExists = await _userManager.FindByEmailAsync(email);
            if (userExists == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = 404, Message = Message.InvalidUser });
            var result = await _userManager.ConfirmEmailAsync(userExists, token);
            return Ok(new Response { Status = 200, Message = Message.ConfirmEmailSuccess });
        }

        [HttpGet]
        [Route("user")]
        public async Task<IActionResult> User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _verifyJwtService.Verify(jwt, _configuration["JWT:Secret"]);
                User user = await _userManager.FindByIdAsync(token.Issuer);
                if (user == null)
                    return StatusCode(StatusCodes.Status404NotFound, new Response { Status = 404, Message = Message.InvalidUser });

                return Ok(new Response { Status = 200, Message = Message.Success, Data = user });
            }
            catch (Exception ex)
            {
                return Unauthorized(ex);
            }
        }

        
    }
}
