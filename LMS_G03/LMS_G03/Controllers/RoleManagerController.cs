using LMS_G03.Authentication;
using LMS_G03.Common;
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
    public class RoleManagerController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;
        public RoleManagerController(RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }
        [HttpPost]
        [Route("allroles")]
        public async Task<IActionResult> AllRoles()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return Ok(new Response { Status = "200", Message = Message.Success, Data = roles });
        }
        [HttpPost]
        [Route("addnewrole")]
        public async Task<IActionResult> AddNewRole(string roleName)
        {
            if (roleName != null)
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName.Trim()));
            }
            return Ok(new Response { Status = "200", Message = Message.Success });
        }
        [HttpPost]
        [Route("viewrole/{id}")]
        public async Task<IActionResult> ViewRole(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new Response { Status = "404", Message = Message.InvalidUser });
            }

            var userrole = await _userManager.GetRolesAsync(user);
            return Ok(new Response { Status = "200", Message = Message.Success, Data = userrole });
        }

        [HttpPost]
        [Route("changerole")]
        public async Task<IActionResult> ChangeRole(List<ManageUserRolesViewModel> model, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new Response { Status = "404", Message = Message.InvalidUser });
            }
            var roles = await _userManager.GetRolesAsync(user);
            var result = await _userManager.RemoveFromRolesAsync(user, roles);
            if (!result.Succeeded)
            {
                return BadRequest(new Response { Status = "500", Message = Message.ErrorFound });
            }
            result = await _userManager.AddToRolesAsync(user, model.Where(x => x.Selected).Select(y => y.RoleName));
            if (!result.Succeeded)
            {
                return BadRequest(new Response { Status = "500", Message = Message.ErrorFound });
            }
            var userrole = await _userManager.GetRolesAsync(user);
            return Ok(new Response { Status = "200", Message = Message.Success, Data = userrole });
        }

        //[HttpPost]
        //[Route("addrole")]
        //public async Task<IActionResult> AddRole(List<ManageUserRolesViewModel> model, string userId)
        //{
        //    var user = await _userManager.FindByIdAsync(userId);
        //    if (user == null)
        //    {
        //        return NotFound(new Response { Status = "404", Message = Message.InvalidUser });
        //    }
        //    var roles = await _userManager.GetRolesAsync(user);
        //    var result = await _userManager.RemoveFromRolesAsync(user, roles);
        //    if (!result.Succeeded)
        //    {
        //        return BadRequest(new Response { Status = "500", Message = Message.ErrorFound });
        //    }
        //    return Ok(new Response { Status = "200", Message = Message.Success, Data = roles });
        //}
    }
}
