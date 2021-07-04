using Dapper;
using DigitallyPowerful.Models;
using DigitallyPowerful.Services;
using DigitallyPowerful.Services.Database;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitallyPowerful.Controllers.Api
{
    [Route("api/[controller]")]
    public class InfluencerController : ControllerBase
    {
        private DatabaseContext DatabaseContext { get; set; }
        private UserService userService { get; set; }
        public InfluencerController(DatabaseContext databaseContext)
        {
            this.DatabaseContext = databaseContext;
            userService = new UserService();
        }

        [HttpGet("influencerprofile")]
        public async Task<List<InfluencerDetails>> GetInfluencerProfile(long userId = 0)
        {
            using (var connection = this.DatabaseContext.Connection)
            {
                if (userId > 0)
                {
                    return await userService.GetInfluencerProfile(connection, userId);
                }
                else
                {
                    return await userService.GetInfluencerProfile(connection);
                }
            }
            return null;
        }


        [HttpPost("influencerprofile")]
        public async Task<Acknowledgement> PostInfluencerProfile(InfluencerDetails request)
        {
            if (String.IsNullOrEmpty(request.Gender) || request.UserId <= 0 || request.DateOfBirth == DateTime.MinValue || request.SocialMedia == null || request.SocialMedia.Count <= 0)
            {
                return new Acknowledgement("Request is Invalid");
            }
            else
            {
                using (var connection = this.DatabaseContext.Connection)
                {
                    if(await userService.PostInfluencerProfile(connection, request))
                    {
                        await userService.UpdatePhoneNumber(connection, request.PhoneNumber, request.UserId);
                        return new Acknowledgement("Saved Successfully", true);
                    }
                    else
                    {
                        return new Acknowledgement("Save Unsuccessful");
                    }
                }
            }
        }
    }
}
