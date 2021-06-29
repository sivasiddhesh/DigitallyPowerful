using DigitallyPowerful.Models;
using DigitallyPowerful.Services;
using DigitallyPowerful.Services.Configuration;
using DigitallyPowerful.Services.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DigitallyPowerful.Controllers.Api
{
    [Route("api/[controller]")]
    public class MailController : ControllerBase
    {
        private readonly IOptions<MailConfig> Config;
        private DatabaseContext DatabaseContext { get; set; }
        private MailService mailService { get; set; }
        public MailController(IOptions<MailConfig> config, DatabaseContext databaseContext)
        {
            Config = config;
            mailService = new MailService(Config.Value);
            DatabaseContext = databaseContext;
        }
        [HttpPost("mail")]
        public Acknowledgement SendMail(MailRequest request)
        {
            if(String.IsNullOrEmpty(request.Email) || String.IsNullOrEmpty(request.Name) || String.IsNullOrEmpty(request.Subject) || String.IsNullOrEmpty(request.Message))
            {
                return new Acknowledgement("Request is Invalid");
            }
            if(mailService.SendMail(this.DatabaseContext.Connection, request))
            {
                return new Acknowledgement("Mail Sent Successfully");
            }
            else
            {
                return new Acknowledgement("Mail Unsuccessful");
            }
        }

    }
}
