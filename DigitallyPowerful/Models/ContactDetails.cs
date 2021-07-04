using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitallyPowerful.Models
{
    public class ContactDetails
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string Role { get; set; }
        public DateTime? DOB { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        
    }
}
