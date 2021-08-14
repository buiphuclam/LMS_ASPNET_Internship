using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.IServices
{
    public interface IMailHelperService
    {
        bool SendEmail(string userEmail, string confirmationLink, string subject);
    }
}
