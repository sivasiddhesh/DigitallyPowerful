using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitallyPowerful.Models
{
    public class CustomMailRequest
    {
        public string ToMailAddress { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public CustomMailRequest(string toMailAddress, string subject, string message)
        {
            ToMailAddress = toMailAddress;
            Subject = subject;
            Message = message;
        }
    }
}
