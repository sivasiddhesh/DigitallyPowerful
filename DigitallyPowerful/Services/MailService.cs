using DigitallyPowerful.Models;
using DigitallyPowerful.Services.Configuration;
using MySqlConnector;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Mail;

namespace DigitallyPowerful.Services
{
    public class MailService
    {
        public MailConfig MailConfig { get; set; }
        private LogService logService { get; set; }
        public MailService(MailConfig config)
        {
            MailConfig = config;
            logService = new LogService();
        }
        public bool SendMail(MySqlConnection connection, MailTemplateGenerated request, bool isReceiverEmail = false)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(MailConfig.EmailAddress);
                    mail.To.Add(isReceiverEmail ? MailConfig.ReceiverEmail : MailConfig.ContactEmail);
                    mail.Subject = request.Subject ;
                    mail.Body = request.Message;
                    mail.IsBodyHtml = true;
                    using (SmtpClient smtp = new SmtpClient(MailConfig.Host, MailConfig.Port))
                    {
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential(MailConfig.EmailAddress, MailConfig.Password);
                        smtp.EnableSsl = false;
                        smtp.Send(mail);
                    }
                }
            }
            catch(Exception ex)
            {
                logService.SaveLogSync(connection, "SendMail", JsonConvert.SerializeObject(request), JsonConvert.SerializeObject(ex));
            }
            return true;
        }


        public bool SendMail(MySqlConnection connection, CustomMailRequest request)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(MailConfig.EmailAddress);
                    mail.To.Add(request.ToMailAddress);
                    mail.Subject = request.Subject;
                    mail.Body = request.Message;
                    mail.IsBodyHtml = true;
                    using (SmtpClient smtp = new SmtpClient(MailConfig.Host, MailConfig.Port))
                    {
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential(MailConfig.EmailAddress, MailConfig.Password);
                        smtp.EnableSsl = false;
                        smtp.Send(mail);
                    }
                }
            }
            catch (Exception ex)
            {
                logService.SaveLogSync(connection, "SendMail", JsonConvert.SerializeObject(request), JsonConvert.SerializeObject(ex));
            }
            return true;
        }
    }
}
