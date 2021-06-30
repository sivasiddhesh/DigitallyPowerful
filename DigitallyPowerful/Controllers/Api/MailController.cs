using DigitallyPowerful.Models;
using DigitallyPowerful.Services;
using DigitallyPowerful.Services.Configuration;
using DigitallyPowerful.Services.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DigitallyPowerful.Controllers.Api
{
    [Route("api/[controller]")]
    public class MailController : ControllerBase
    {
        private readonly IOptions<MailConfig> Config;
        private DatabaseContext DatabaseContext { get; set; }
        private MailService mailService { get; set; }
        private MailWrapper mailWrapper { get; set; }
        private UserService userService { get; set; }
        public MailController(IOptions<MailConfig> config, DatabaseContext databaseContext)
        {
            Config = config;
            mailService = new MailService(Config.Value);
            DatabaseContext = databaseContext;
            mailWrapper = new MailWrapper();
            userService = new UserService();
        }
        [HttpPost("mail")]
        public Acknowledgement SendMail(MailRequest request)
        {
            if(String.IsNullOrEmpty(request.Email) || String.IsNullOrEmpty(request.Name) || String.IsNullOrEmpty(request.Subject) || String.IsNullOrEmpty(request.Message))
            {
                return new Acknowledgement("Request is Invalid");
            }
            var mailContent = mailWrapper.GenerateMail(EnumContainer.MailTemplate.CustomMail);
            mailContent.Message = mailContent.Message.Replace("@Name", request.Name).Replace("@Subject", request.Subject).Replace("@Email", request.Email).Replace("@Message", request.Message);
            if (mailService.SendMail(this.DatabaseContext.Connection, mailContent))
            {
                return new Acknowledgement("Mail Sent Successfully", true);
            }
            else
            {
                return new Acknowledgement("Mail Unsuccessful");
            }
        }


        [HttpPost("contactmail")]
        public async Task<Acknowledgement> SendContactMail()
        {
            var contactDetails = await userService.GetContactDetails(this.DatabaseContext.Connection);
            var mailContent = mailWrapper.GenerateMail(EnumContainer.MailTemplate.ContactMail);
            var finalMailContent = mailWrapper.ContactWrapper(mailContent, contactDetails);
            
            if (mailService.SendMail(this.DatabaseContext.Connection, finalMailContent))
            {
                return new Acknowledgement("Mail Sent Successfully", true);
            }
            else
            {
                return new Acknowledgement("Mail Unsuccessful");
            }
        }
    }
}
