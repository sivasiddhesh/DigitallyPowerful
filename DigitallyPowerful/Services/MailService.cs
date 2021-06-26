using DigitallyPowerful.Models;
using DigitallyPowerful.Services.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace DigitallyPowerful.Services
{
    public class MailService
    {
        public MailConfig MailConfig { get; set; }
        public MailService(MailConfig config)
        {
            MailConfig = config;
        }
        public bool SendMail(MailRequest request)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(MailConfig.EmailAddress);
                    mail.To.Add(MailConfig.ReceiverEmail);
                    mail.Subject = request.Subject + " ( From Email : "+request.Email+", Name : "+request.Name +" )";
                    mail.Body = request.Message;
                    mail.IsBodyHtml = true;
                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential(MailConfig.EmailAddress, MailConfig.Password);
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }
                }
            }
            catch(Exception ex)
            {

            }
            return true;
        }
    }
}
