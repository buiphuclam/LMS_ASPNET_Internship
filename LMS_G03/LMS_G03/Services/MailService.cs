using LMS_G03.Authentication;
using LMS_G03.Common;
using LMS_G03.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace LMS_G03.Services
{
    public class MailService : IMailService
    {
        public string GetMailBody(RegisterModel oRegisterModel)
        {
            string url = Global.DomainName + "api/authenticate/confirmmail?username=" + oRegisterModel.Username;

            return string.Format(@"<div style='text-align:center;'>
                                    <h1>Welcome to our Web Site</h1>
                                    <h3>Click below button for verify your Email Id</h3>
                                    <form method='post' action='{0}' style='display: inline;'>
                                      <button type = 'submit' style=' display: block;
                                                                    text-align: center;
                                                                    font-weight: bold;
                                                                    background-color: #008CBA;
                                                                    font-size: 16px;
                                                                    border-radius: 10px;
                                                                    color:#ffffff;
                                                                    cursor:pointer;
                                                                    width:100%;
                                                                    padding:10px;'>
                                        Confirm Mail
                                      </button>
                                    </form>
                                </div>", url, oRegisterModel.Username);
        }

        public async Task<string> SendMail(MailModel oMailModel)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(oMailModel.FromMail);
                    oMailModel.ToMails.ForEach(x =>
                    {
                        mail.To.Add(x);
                    });
                    mail.Subject = oMailModel.Subject;
                    mail.Body = oMailModel.Body;
                    mail.IsBodyHtml = oMailModel.IsBodyHtml;
                    oMailModel.Attachments.ForEach(x =>
                    {
                        mail.Attachments.Add(new Attachment(x));
                    });
                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new System.Net.NetworkCredential(oMailModel.FromMail, oMailModel.FromPassword);
                        smtp.EnableSsl = true;
                        await smtp.SendMailAsync(mail);
                        return Message.MailSent;
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
