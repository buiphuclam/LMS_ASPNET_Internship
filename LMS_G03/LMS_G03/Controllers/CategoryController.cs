using LMS_G03.Authentication;
using LMS_G03.Common;
using LMS_G03.Models;
using LMS_G03.ViewModel;
using Microsoft.AspNetCore.Http;
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
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("addcategory")]
        public async Task<IActionResult> AddCategory([FromBody] CategoryModel category)
        {
            var checkcategory = await _context.Category.Where(a => a.CategoryCode.Equals(category.CategoryCode.ToUpper())).FirstOrDefaultAsync();
            if (checkcategory != null)
                return BadRequest(new Response { Status = 500, Message = Message.DuplicateValue });

            Category newcategory = new Category()
            {
                CategoryCode = category.CategoryCode.ToUpper(),
                CategoryName = category.CategoryName.ToUpper(),
                CategoryShortDetail = category.CategoryShortDetail
            };

            _context.Category.Add(newcategory);
            try
            {
                var result = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = newcategory });
        }

        [HttpGet("getcategory")]
        public async Task<IActionResult> GetCategory()
        {
            List<Category> categories;

            try
            {
                categories = await _context.Category.ToListAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = 500, Message = ex.Message });
            }

            return Ok(new Response { Status = 200, Message = Message.Success, Data = categories });
        }

        [HttpPost("deletecategory")]
        public async Task<IActionResult> DeleteCategory([FromBody] string categoryId)
        {
            var checkcategory = await _context.Category.FindAsync(categoryId);

            _context.Category.Remove(checkcategory);
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
    }
}
