using DigitallyPowerful.Models;
using DigitallyPowerful.Services;
using DigitallyPowerful.Services.Database;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DigitallyPowerful.Controllers
{
    [Route("api/[controller]")]
    public class BrandController : ControllerBase
    {
        private DatabaseContext DatabaseContext { get; set; }
        private UserService userService { get; set; }
        public BrandController(DatabaseContext databaseContext)
        {
            this.DatabaseContext = databaseContext;
            userService = new UserService();
        }

        [HttpGet("branddetails")]
        public async Task<List<BrandDetails>> GetBrandDetails(long userId = 0)
        {
            using (var connection = this.DatabaseContext.Connection)
            {
                if (userId > 0)
                {
                    return await userService.GetBrandDetails(connection, userId);
                }
                else
                {
                    return await userService.GetBrandDetails(connection);
                }
            }
            return null;
        }

        [HttpPost("branddetails")]
        public async Task<Acknowledgement> PostBrandDetails(BrandDetails request)
        {
            if(String.IsNullOrEmpty(request.BrandDescription) || request.UserId <= 0 || request.ProjectTypeId <= 0)
            {
                return new Acknowledgement("Request is Invalid");
            }
            using (var connection = this.DatabaseContext.Connection)
            {
                if(await userService.PostBrandDetails(connection, request))
                {
                    await userService.UpdatePhoneNumber(connection, request.PhoneNumber, request.UserId);
                    return new Acknowledgement("Saved Successfully",true);
                }
                else
                {
                    return new Acknowledgement("Save Unsuccessfully");
                }
            }
        }
    }
}
