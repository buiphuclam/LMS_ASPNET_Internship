using LMS_G03.Common;
using LMS_G03.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleDriveController : ControllerBase
    {
        [HttpPost("createfile")]
        public IActionResult CreateFolder([FromForm] GDriveTest1 upload)
        {
            string folderId = GoogleDriveFilesRepository.CreateFolder(upload.folderName, "testmail.trustme@gmail.com", "root", "writer");
            string fileId = GoogleDriveFilesRepository.UploadFileInFolder(folderId, upload.uploadFile,"no comment");
            return Ok(folderId + "|" + fileId);
        }

        [HttpPost("replacefile")]
        public async Task<IActionResult> ReplaceFile(String oldFileId, String parentsId, IFormFile FileName)
        {
            string fileId = GoogleDriveFilesRepository.ReplaceFileInFolder(oldFileId, parentsId, FileName,"no comment");
            return Ok(parentsId + "|" + fileId);
        }
    }
}
