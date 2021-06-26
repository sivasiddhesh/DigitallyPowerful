using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitallyPowerful.Models
{
    public class InfluencerDetails
    {
        public long UserId { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime? DOB { get; set; }
        public string Gender { get; set; }
        public List<SocialMedia> SocialMedia { get; set; }
    }
    public class SocialMedia
    {
        public long SocialMediaTypeId { get; set; }
        public string SocialMediaTypeName { get; set; }
        public string SocialMediaLink { get; set; }
        public string FollowersCount { get; set; }
        public long CountTypeId { get; set; }
    }
}
