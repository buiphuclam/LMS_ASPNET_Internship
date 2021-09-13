using LMS_G03.Authentication;
using LMS_G03.Common;
using LMS_G03.Common.Helpers;
using LMS_G03.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
    public class AdminController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;
        private IUriService _uriService;
        public AdminController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context, IUriService uriService)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
            _uriService = uriService;
        }

        [HttpGet("getuser")]
        public Task<IActionResult> GetUser([FromQuery] PaginationFilter filter, string id) =>
            (id == null) ? GetAllUser(filter) : GetUserById(id);
        private async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound(new Response { Status = 404, Message = Message.NotFound, Data = user });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = user });
        }
        private async Task<IActionResult> GetAllUser([FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var pagedData = await _userManager.Users
                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();

            var users = await _userManager.Users.CountAsync();
            var pagedReponse = PageHelper.CreatePagedReponse<User>(pagedData, validFilter, users, _uriService, route);
            if (users == 0)
            {
                pagedReponse.Status = 404;
                pagedReponse.Message = "Not found";
            }

            return Ok(pagedReponse);
        }

        [HttpDelete("deleteuser")]
        public async Task<IActionResult> DeleteUser(string Id)
        {
            var user = await _userManager.FindByIdAsync(Id);
            if (user == null)
            {
                return NotFound(new Response { Status = 404, Message = Message.InvalidUser });
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new Response { Status = 500, Message = Message.SomethingWrong });
            }

            return Ok(new Response { Status = 200, Message = Message.Success });
        }

        [HttpGet]
        [Route("getuser/{role}")]
        public async Task<IActionResult> ViewUsersOfRole(string roleName)
        {
            var users = await _userManager.GetUsersInRoleAsync(roleName);
            if (users == null)
            {
                return NotFound(new Response { Status = 404, Message = Message.NotFound });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = users });
        }

        [HttpGet]
        [Route("allroles")]
        public async Task<IActionResult> AllRoles()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return Ok(new Response { Status = 200, Message = Message.Success, Data = roles });
        }

        [HttpPost]
        [Route("addnewrole")]
        public async Task<IActionResult> AddNewRole(string roleName)
        {
            if (roleName == null || roleName.Equals("") || roleName.Length <= 0)
            {
                return BadRequest(new Response { Status = 500, Message = Message.SomethingWrong });
            }
            var newRole = await _roleManager.CreateAsync(new IdentityRole(roleName.Trim()));
            return Ok(new Response { Status = 200, Message = Message.Success, Data = newRole });
        }

        [HttpGet]
        [Route("viewrole/{id}")]
        public async Task<IActionResult> ViewRolesOfUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new Response { Status = 404, Message = Message.InvalidUser });
            }

            var userRole = await _userManager.GetRolesAsync(user);
            return Ok(new Response { Status = 200, Message = Message.Success, Data = userRole });
        }

        [HttpPost]
        [Route("changerole")]
        public async Task<IActionResult> ChangeRolesOfUser(List<ManageUserRolesViewModel> model, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new Response { Status = 404, Message = Message.InvalidUser });
            }
            var roles = await _userManager.GetRolesAsync(user);
            var result = await _userManager.RemoveFromRolesAsync(user, roles);
            if (!result.Succeeded)
            {
                return BadRequest(new Response { Status = 500, Message = Message.ErrorFound });
            }
            result = await _userManager.AddToRolesAsync(user, model.Where(x => x.Selected).Select(y => y.RoleName));
            if (!result.Succeeded)
            {
                return BadRequest(new Response { Status = 500, Message = Message.ErrorFound });
            }
            var userrole = await _userManager.GetRolesAsync(user);
            return Ok(new Response { Status = 200, Message = Message.Success, Data = userrole });
        }

        [HttpPost]
        [Route("removerole")]
        public async Task<IActionResult> RemoveRole(List<ManageUserRolesViewModel> roleModels)
        {
            var roles = new List<IdentityRole>();
            foreach (var roleModel in roleModels)
            {
                var role = await _roleManager.FindByNameAsync(roleModel.RoleName);
                roles.Add(role);
            }
            
            if (roles == null || roles.Count <= 0)
            {
                return NotFound(new Response { Status = 404, Message = Message.NotFound, Data = roles });
            }

            foreach (var role in roles)
            {
                await _roleManager.DeleteAsync(role);
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = _roleManager.Roles });
        }
        //[HttpPost]
        //[Route("removerole")]
        //public async Task<IActionResult> RemoveRole(List<ManageUserRolesViewModel> model, string userId)
        //{
        //    var user = await _userManager.FindByIdAsync(userId);
        //    if (user == null)
        //    {
        //        return NotFound(new Response { Status = "404", Message = Message.InvalidUser });
        //    }
        //    var roles = await _userManager.GetRolesAsync(user);
        //    var result = await _userManager.RemoveFromRoleAsync(user, roles);
        //    if (!result.Succeeded)
        //    {
        //        return BadRequest(new Response { Status = "500", Message = Message.ErrorFound });
        //    }
        //    return Ok(new Response { Status = "200", Message = Message.Success, Data = roles });
        //}
    }
}
