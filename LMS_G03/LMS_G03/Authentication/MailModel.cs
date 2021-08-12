using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Authentication
{
    public class MailModel
    {
        public string FromMail { get; set; } = "testmail.trustme@gmail.com";
        public string FromPassword { get; set; } = "Talatama66#*";
        public List<String> ToMails { get; set; } = new List<string>();
        public string Subject { get; set; } = "";
        public string Body { get; set; } = "";
        public bool IsBodyHtml { get; set; } = true;
        public List<string> Attachments { get; set; } = new List<string>();
    }
}
