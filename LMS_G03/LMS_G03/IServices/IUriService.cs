using LMS_G03.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.IServices
{
    public interface IUriService
    {
        Uri GetPageUri(PaginationFilter filter, string route);
    }
}
