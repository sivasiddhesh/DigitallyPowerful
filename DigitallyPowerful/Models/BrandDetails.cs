using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitallyPowerful.Models
{
    public class BrandDetails
    {
        public long UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public long ProjectTypeId { get; set; }
        public string ProjectTypeName { get; set; }
        public string ProjectName { get; set; }
        public string BrandDescription { get; set; }
    }
}
