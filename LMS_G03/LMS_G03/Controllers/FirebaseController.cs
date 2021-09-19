using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using LMS_G03.Authentication;
using LMS_G03.Common;
using LMS_G03.IServices;
using LMS_G03.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FirebaseController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private IVerifyJwtService _verifyJwtService;
        private readonly IConfiguration _configuration;

        public FirebaseController(UserManager<User> userManager, IConfiguration configuration
            , IVerifyJwtService verifyJwtService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _verifyJwtService = verifyJwtService;
        }

        IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "Fwm1SpEvHsfec3unxb8JyA13bTtsmZXM4NoXyY5v",
            BasePath = "https://lmsg03-59f7e-default-rtdb.firebaseio.com"
        };
        IFirebaseClient client;
        [HttpGet]
        [Route("index/{sectionId}")]
        public IActionResult Index(string sectionId)
        {
            client = new FirebaseClient(config);
            var response = client.Get(sectionId);
            dynamic jResult = JsonConvert.DeserializeObject(response.Body);
            if(jResult == null)
                return NotFound(new Response { Status = 404, Message = "Nothing!" });
            var list = new List<Comment>();
            foreach(var item in jResult)
            {
                list.Add(JsonConvert.DeserializeObject<Comment>(((JProperty)item).Value.ToString()));
            }
            return Ok(new Response { Status = 200, Message = "Ok!", Data = list });
        }

        [HttpPost]
        [Route("create/{sectionId}")]
        public async Task<IActionResult> Create(string sectionId, [FromBody] string comment)
        {
            var jwt = Request.Cookies["jwt"];
            var token = _verifyJwtService.Verify(jwt, _configuration["JWT:Secret"]);
            User user = await _userManager.FindByIdAsync(token.Issuer);
            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = 404, Message = Message.InvalidUser });
            DateTime serverTime = DateTime.Now;
            DateTime utcTime = serverTime.ToUniversalTime();
            TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            Comment commentView = new Comment
            {
                Username = user.UserName,
                DateTime = TimeZoneInfo.ConvertTimeFromUtc(utcTime, tzi).ToString("yyyy-MM-ddTHH:mm:ss"),
                Comments = comment
            };

            InsertData(sectionId, commentView);
            return Ok(new Response { Status = 200, Message = "Ok", Data = comment });
        }

        private void InsertData(string sectionId,Comment comment)
        {
            client = new FirebaseClient(config);
            _ = client.Push(sectionId + "/", comment);
        }
    }
}
