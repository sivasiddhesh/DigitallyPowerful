using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitallyPowerful.Services.Configuration
{
    public class MailConfig
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string ReceiverEmail { get; set; }
        public string ContactEmail { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }
}
