using LMS_G03.Common;
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
    public class GoogleDriveController : ControllerBase
    {
        [HttpPost]
        public ActionResult CreateFolder(String FolderName, String FileName)
        {
            string folderId = GoogleDriveFilesRepository.CreateFolder(FolderName, "testmail.trustme@gmail.com", "root", "writer");
            string fileId = GoogleDriveFilesRepository.UploadFileInFolder(folderId, FileName);
            return Ok(folderId + "|" + fileId);
        }
    }
}
