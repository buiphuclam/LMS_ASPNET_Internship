using LMS_G03.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.IServices
{
    public interface ILoginInfoService
    {
        Task<RegisterModel> SignUp(RegisterModel oRegisterInfo);
        Task<string> ConfirmMail(string username);

    }
}
