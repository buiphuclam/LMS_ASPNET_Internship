﻿using Microsoft.AspNetCore.Http;
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
        private IMailHelperService _mailHelperService;

        public AuthenticateController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration
            , IMailHelperService mailHelperService)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _mailHelperService = mailHelperService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
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
            var result = await userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = Message.SomethingWrong });
            else
            {
                var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authenticate", new { token, email = registerModel.Email }, Request.Scheme);
                bool emailResponse = _mailHelperService.SendEmail(registerModel.Email, confirmationLink, "Email confirmation");

                if (emailResponse)
                    return Ok(new Response { Status = Message.Success, Message = Message.UserCreatedVerifyMail });
                else
                {
                    return BadRequest(new { message = Message.ErrorFound });
                }
            }
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
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = "User already exists!" });

            User user = new User()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = "User creation failed! Please check user details and try again." });

            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }

            return Ok(new Response { Status = Message.Success, Message = "User created successfully!" });
        }

        [HttpPost]
        [Route("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel changePasswordModel)
        {
            var userExists = await userManager.FindByNameAsync(changePasswordModel.Username);
            if (userExists == null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = Message.InvalidUser });

            userExists.SecurityStamp = Guid.NewGuid().ToString();
            var result = await userManager.ChangePasswordAsync(userExists, changePasswordModel.CurrentPassword, changePasswordModel.NewPassword);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = Message.SomethingWrong });
            return Ok(new Response { Status = Message.Success, Message = Message.ChangePasswordSuccess });
        }

        [HttpPost]
        [Route("forgetpassword")]
        public async Task<IActionResult> ForgotPassword(ForgetPasswordModel forgetPasswordModel)
        {
            var user = await userManager.FindByEmailAsync(forgetPasswordModel.Email);
            if (user == null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = Message.InvalidUser });
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var resetPasswordLink = Url.Action(nameof(ResetPassword), "Authenticate", new { token, email = user.Email }, Request.Scheme);
            //var message = new Message(new string[] { user.Email }, "Reset password token", callback, null);
            bool emailResponse = _mailHelperService.SendEmail(forgetPasswordModel.Email, resetPasswordLink, "Reset password confirmation");

            if (emailResponse)
                return Ok(new Response { Status = Message.Success, Message = Message.MailSent });
            else
            {
                return BadRequest(new { message = Message.ErrorFound });
            }
        }

        [HttpPost]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel resetPasswordModel)
        {
            var user = await userManager.FindByEmailAsync(resetPasswordModel.Email);
            if (user == null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = Message.InvalidUser });
            var resetPassResult = await userManager.ResetPasswordAsync(user, resetPasswordModel.Token, resetPasswordModel.NewPassword);
            if (!resetPassResult.Succeeded)
            {
                return BadRequest(new { message = Message.ErrorFound });
            }
            return Ok(new Response { Status = Message.Success, Message = Message.ChangePasswordSuccess });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("confirmemail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var userExists = await userManager.FindByEmailAsync(email);
            if (userExists == null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Message.ErrorFound, Message = Message.InvalidUser });
            var result = await userManager.ConfirmEmailAsync(userExists, token);
            return Ok(new Response { Status = Message.Success, Message = Message.ConfirmEmailSuccess });
        }
    }
}