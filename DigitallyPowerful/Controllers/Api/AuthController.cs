using DigitallyPowerful.Services.Database;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using DigitallyPowerful.Models;
using System;
using DigitallyPowerful.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DigitallyPowerful.Controllers.Api
{
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private DatabaseContext DatabaseContext { get; set; }
        private UserService userService { get; set; }
        public AuthController(DatabaseContext databaseContext)
        {
            this.DatabaseContext = databaseContext;
            userService = new UserService(databaseContext);
        }
        
        [HttpGet("{id}")]
        public async Task<string> Get(int id)
        {
            using (var connection = this.DatabaseContext.Connection)
            {
                var sqlQuery = $"select * from CountType";
                var i = await connection.QueryAsync(sqlQuery);
            }
            return "value";
        }

        /// <summary>
        /// SIGNUP API
        /// </summary>
        /// <param name="request">SignUpRequest</param>
        /// <returns>Acknowledgement</returns>
        [HttpPost("signup")]
        public async Task<Acknowledgement> SignUp(SignUpRequest request)
        {
            if(String.IsNullOrEmpty(request.EmailAddress) || String.IsNullOrEmpty(request.FirstName) ||
                String.IsNullOrEmpty(request.PhoneNumber) || String.IsNullOrEmpty(request.Password) || request.RoleTypeId <= 0 || request.RoleTypeId > 3)
            {
                return new Acknowledgement("Request is Invalid");
            }
            else
            {
                using (var connection = this.DatabaseContext.Connection)
                {
                    if (await userService.EmailExists(connection,request.EmailAddress.ToLower().Trim()))
                    {
                        return new Acknowledgement("Email Address Exists");
                    }
                    else
                    {
                        if (await userService.SaveUser(connection, request))
                        {
                            return new Acknowledgement("Saved Successfully", await userService.GetUserId(connection, request.EmailAddress.ToLower().Trim()), request.RoleTypeId, await userService.GetRoleTypeName(connection,request.RoleTypeId));
                        }
                        else
                        {
                            return new Acknowledgement("Save Unsuccessful");
                        }
                    }
                }
            }
        }

        [HttpGet("login")]
        public async Task<Acknowledgement> Login(string emailAddress, string password)
        {
            if (String.IsNullOrEmpty(emailAddress) || String.IsNullOrEmpty(password))
            {
                return new Acknowledgement("Request is Invalid");
            }
            else
            {
                using (var connection = this.DatabaseContext.Connection)
                {
                    if (!await userService.EmailExists(connection, emailAddress.ToLower().Trim()))
                    {
                        return new Acknowledgement("Email Address Not Exists");
                    }
                    else
                    {
                        var userdetails = await userService.GetLoginDetails(connection, emailAddress.ToLower().Trim(), password);
                        if (userdetails != null)
                        {
                            return new Acknowledgement("Login Successful", userdetails.Id, userdetails.RoleTypeId, await userService.GetRoleTypeName(connection, userdetails.RoleTypeId));
                        }
                        else
                        {
                            return new Acknowledgement("Password Incorrect");
                        }
                    }
                }
            }
        }
    }
}
