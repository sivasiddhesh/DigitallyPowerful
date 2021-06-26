using DigitallyPowerful.Models;
using DigitallyPowerful.Services;
using DigitallyPowerful.Services.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DigitallyPowerful.Controllers.Api
{
    [Route("api/[controller]")]
    public class MailController : ControllerBase
    {
        private readonly IOptions<MailConfig> Config;
        private MailService mailService { get; set; }
        public MailController(IOptions<MailConfig> config)
        {
            Config = config;
            mailService = new MailService(Config.Value);
        }
        [HttpPost("mail")]
        public Acknowledgement SendMail(MailRequest request)
        {
            if(String.IsNullOrEmpty(request.Email) || String.IsNullOrEmpty(request.Name) || String.IsNullOrEmpty(request.Subject) || String.IsNullOrEmpty(request.Message))
            {
                return new Acknowledgement("Request is Invalid");
            }
            if(mailService.SendMail(request))
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
