﻿using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Drive.v3;
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
        public static string[] Scopes = { DriveService.Scope.Drive };
        //public static DriveService GetService_v3()
        //{
        //    const string PathToOAuthFile = @"Authentication\client_secret.json";

        //    string credPath = "token.json";
        //    UserCredential credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
        //            //GoogleClientSecrets.Load(stream).Secrets,
        //            new ClientSecrets
        //            {
        //                ClientId = "876672077508-1tlkrgltj3ss8j9cikd9edmnvcm0ahht.apps.googleusercontent.com",
        //                ClientSecret = "oqdNPPfviOUTUc7I2wKhWqj0"
        //            },
        //            Scopes,
        //            "Admin",
        //            CancellationToken.None,
        //            new FileDataStore(credPath, true)).Result;
        //    using (var stream = new FileStream(PathToOAuthFile, FileMode.Open, FileAccess.Read))
        //    {
        //    }

        //    GoogleCredential credential = await auth.GetCredentialAsync();

        //    const string PathToServiceAccountKeyFile = @"Authentication\oauth2sacredentials.json";
        //    var credential = GoogleCredential.FromFile(PathToServiceAccountKeyFile)
        //                    .CreateScoped(DriveService.ScopeConstants.Drive);

        //    DriveService service = new DriveService(new BaseClientService.Initializer()
        //    {
        //        HttpClientInitializer = credential,
        //        ApplicationName = "GoogleDriveRestAPI-v3",
        //    });

        //    return service;
        //}
        private static DriveService GetService_v3()
        {
            var tokenResponse = new TokenResponse
            {
                AccessToken = "ya29.a0ARrdaM92sCI0TxpH7cKgR3Fe5oTcfu6CaHpZk3n4Kkkp3erg7ia3UFXJEC1qkhPISdIYF9hMimV5e2MOOG9Fa2Tj7xxYWqSy-Ay-nRgEKwvhxke7BgcU4Vrp2N6cMZbrds3pZzpZHSt_DuDQdk5kcY-Xbtz4",
                RefreshToken = "1//04BMflC4gb6LnCgYIARAAGAQSNwF-L9IrPCebftU_y0-6UNh8boSlZ_AXDqvwz-AXImiNr0K4sAuxfB6slUcxaPbJU0gGI5YF2qM"
            };

            var applicationName = "Oauth2SACredentials";
            var username = "testmail.trustme@gmail.com";

            var apiCodeFlow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = "876672077508-1tlkrgltj3ss8j9cikd9edmnvcm0ahht.apps.googleusercontent.com",
                    ClientSecret = "oqdNPPfviOUTUc7I2wKhWqj0"
                },
                Scopes = Scopes,
                DataStore = new FileDataStore(applicationName)
            });

            var credential = new UserCredential(apiCodeFlow, username, tokenResponse);

            var service = new DriveService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = applicationName
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

        public static string UploadFileInFolder(string parentsId, IFormFile uploadFile)
        {
            if (!uploadFile.Equals(null))
            {
                DriveService service = GetService_v3();

                var uploadFileMime = GetMimeType(uploadFile.FileName);

                var driveFile = new Google.Apis.Drive.v3.Data.File();
                driveFile.Name = uploadFile.FileName;
                driveFile.MimeType = uploadFileMime;
                driveFile.Parents = new string[] { parentsId };

                using (var ms = new MemoryStream())
                {
                    uploadFile.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    string s = Convert.ToBase64String(fileBytes);
                    // act on the Base64 data
                    var request = service.Files.Create(driveFile, ms, uploadFileMime);
                    request.Fields = "id";

                    var response = request.Upload();
                    if (response.Status != Google.Apis.Upload.UploadStatus.Completed)
                        throw response.Exception;

                    return request.ResponseBody.Id;
                }
            }
            else
            {
                return null;
            }
        }

        public static string ReplaceFileInFolder(string oldFileId, string parentsId, string uploadFile)
        {
            if (System.IO.File.Exists(uploadFile) && (!oldFileId.Equals(null)) && (!parentsId.Equals(null)))
            {
                Google.Apis.Drive.v3.DriveService service = GetService_v3();

                Google.Apis.Drive.v3.Data.File body = new Google.Apis.Drive.v3.Data.File();
                body.Name = System.IO.Path.GetFileName(uploadFile);
                //body.Description = 
                body.MimeType = GetMimeType(uploadFile);
                body.Parents = new List<string> { parentsId };
                byte[] byteArray = System.IO.File.ReadAllBytes(uploadFile);
                System.IO.MemoryStream stream = new System.IO.MemoryStream(byteArray);
                try
                {
                    FilesResource.CreateMediaUpload uploadRequest = service.Files.Create(body, stream, GetMimeType(uploadFile));
                    uploadRequest.SupportsTeamDrives = true;
                    uploadRequest.Upload();

                    var file = uploadRequest.ResponseBody;

                    FilesResource.DeleteRequest deleteRequest = service.Files.Delete(oldFileId);
                    deleteRequest.Execute();

                    return file.Id;
                }
                catch (Exception e)
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        private static string GetMimeType(string fileName) 
        { 
            string mimeType = "application/unknown"; 
            string ext = System.IO.Path.GetExtension(fileName).ToLower(); 
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext); 
            if (regKey != null && regKey.GetValue("Content Type") != null) 
                mimeType = regKey.GetValue("Content Type").ToString(); 
            System.Diagnostics.Debug.WriteLine(mimeType); 
            return mimeType; 
        }
    }
}