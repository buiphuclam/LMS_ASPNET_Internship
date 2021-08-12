using LMS_G03.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.IServices
{
    public interface IMailService
    {
        Task<string> SendMail(MailModel oMailModel);
        string GetMailBody(RegisterModel oRegisterModel);
    }
}
