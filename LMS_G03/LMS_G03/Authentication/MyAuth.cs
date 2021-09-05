//using Microsoft.AspNetCore.Authorization;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http;
//using System.Security.Claims;
//using System.Threading.Tasks;

//namespace LMS_G03.Authentication
//{
//    public class MyAuth : AuthorizeAttribute
//    {
//        public new string Roles { get; set; }
//        protected override bool IsAuthorized(HttpActionContext actionContext)
//        {
//            ClaimsPrincipal currentPrincipal = HttpContext.Current.User as ClaimsPrincipal;
//            if (currentPrincipal != null && CheckRoles(currentPrincipal))
//            {
//                return true;
//            }
//            else
//            {
//                actionContext.Response =
//                    new HttpResponseMessage(
//                    System.Net.HttpStatusCode.Unauthorized)
//                    {
//                        ReasonPhrase = "Some message"
//                    };
//                return false;
//            }
//        }

//        private bool CheckRoles(ClaimsPrincipal principal)
//        {
//            string[] roles = RolesSplit;
//            if (roles.Length == 0) return true;
//            return roles.Any(principal.IsInRole);
//        }

//        protected string[] RolesSplit
//        {
//            get { return SplitStrings(Roles); }
//        }

//        protected static string[] SplitStrings(string input)
//        {
//            if (string.IsNullOrWhiteSpace(input)) return new string[0];
//            var result = input.Split(',').Where(s => !String.IsNullOrWhiteSpace(s.Trim()));
//            return result.Select(s => s.Trim()).ToArray();
//        }
//    }
//}
