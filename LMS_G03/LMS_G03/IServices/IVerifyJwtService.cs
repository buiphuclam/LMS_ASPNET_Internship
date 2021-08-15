using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.IServices
{
    public interface IVerifyJwtService
    {
        JwtSecurityToken Verify(string jwt, string secret);
    }
}
