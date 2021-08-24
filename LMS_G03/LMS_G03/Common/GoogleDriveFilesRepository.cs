using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LMS_G03.Common
{
    public class GoogleDriveFilesRepository
    {
        public static string[] Scopes = { Google.Apis.Drive.v3.DriveService.Scope.Drive };
        public static Google.Apis.Drive.v3.DriveService GetService_v3()
        {
            UserCredential credential;
            using (var stream = new FileStream(@"D:\client_secret2.json", FileMode.Open, FileAccess.Read))
            {
                string credPath = "token.json";
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
                //Console.WriteLine("Credential file saved to: " + credPath);
            }

            //Create Drive API service.
            Google.Apis.Drive.v3.DriveService service = new Google.Apis.Drive.v3.DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "GoogleDriveRestAPI-v3",
            });

            return service;
        }

        public static string CreateFolder(string FolderName, string TeacherEmail, string parentsId, string role)
        {
            Google.Apis.Drive.v3.DriveService service = GetService_v3();

            Google.Apis.Drive.v3.Data.File FileMetaData = new Google.Apis.Drive.v3.Data.File();
            FileMetaData.Name = FolderName;
            FileMetaData.MimeType = "application/vnd.google-apps.folder";
            FileMetaData.Parents = new List<string> { parentsId };

            Google.Apis.Drive.v3.FilesResource.CreateRequest request;

            request = service.Files.Create(FileMetaData);
            request.Fields = "id";
            var file = request.Execute();

            Google.Apis.Drive.v3.Data.Permission permission = new Google.Apis.Drive.v3.Data.Permission()
            {
                Type = "user",
                EmailAddress = TeacherEmail,
                Role = role
            };

            permission = service.Permissions.Create(permission, file.Id).Execute();

            return file.Id;
        }
        //public static void FileUploadInFolder(string folderId, HttpPostedFileBase file)
        //{
        //    if (file != null && file.ContentLength > 0)
        //    {
        //        Google.Apis.Drive.v3.DriveService service = GetService_v3();

        //        string path = Path.Combine(HttpContext.Current.Server.MapPath("~/GoogleDriveFiles"),
        //        Path.GetFileName(file.FileName));
        //        file.SaveAs(path);

        //        var FileMetaData = new Google.Apis.Drive.v3.Data.File()
        //        {
        //            Name = Path.GetFileName(file.FileName),
        //            MimeType = MimeMapping.GetMimeMapping(path),
        //            Parents = new List<string>
        //            {
        //                folderId
        //            }
        //        };

        //        Google.Apis.Drive.v3.FilesResource.CreateMediaUpload request;
        //        using (var stream = new System.IO.FileStream(path, System.IO.FileMode.Open))
        //        {
        //            request = service.Files.Create(FileMetaData, stream, FileMetaData.MimeType);
        //            request.Fields = "id";
        //            request.Upload();
        //        }
        //        var file1 = request.ResponseBody;
        //    }
        //}
       
        //public static void FileUpload(HttpPostedFileBase file)
        //{
        //    if (file != null && file.ContentLength > 0)
        //    {
        //        Google.Apis.Drive.v3.DriveService service = GetService_v3();

        //        string path = Path.Combine(HttpContext.Current.Server.MapPath("~/GoogleDriveFiles"),
        //        Path.GetFileName(file.FileName));
        //        file.SaveAs(path);

        //        var FileMetaData = new Google.Apis.Drive.v3.Data.File();
        //        FileMetaData.Name = Path.GetFileName(file.FileName);
        //        FileMetaData.MimeType = MimeMapping.GetMimeMapping(path);

        //        Google.Apis.Drive.v3.FilesResource.CreateMediaUpload request;

        //        using (var stream = new System.IO.FileStream(path, System.IO.FileMode.Open))
        //        {
        //            request = service.Files.Create(FileMetaData, stream, FileMetaData.MimeType);
        //            request.Fields = "id";
        //            request.Upload();
        //        }
        //    }
        //}


    }
}
