using DigitallyPowerful.Services.Database;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Dapper;
using DigitallyPowerful.Models;
using System;
using DigitallyPowerful.Services;
using Microsoft.Extensions.Options;
using DigitallyPowerful.Services.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DigitallyPowerful.Controllers.Api
{
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private DatabaseContext DatabaseContext { get; set; }
        private readonly IOptions<MailConfig> Config;
        private UserService userService { get; set; }
        private CommonService commonService { get; set; }
        private MailService mailService { get; set; }
        private MailWrapper mailWrapper { get; set; }
        public AuthController(DatabaseContext databaseContext, IOptions<MailConfig> config)
        {
            this.DatabaseContext = databaseContext;
            userService = new UserService();
            commonService = new CommonService();
            Config = config;
            mailWrapper = new MailWrapper();
            mailService = new MailService(Config.Value);
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
                            await userService.UpdateLogOn(connection, emailAddress.ToLower().Trim());
                            return new Acknowledgement("Login Successful", userdetails.Id, userdetails.RoleTypeId, await userService.GetRoleTypeName(connection, userdetails.RoleTypeId), userdetails.IsResetPassword);
                        }
                        else
                        {
                            return new Acknowledgement("Password Incorrect");
                        }
                    }
                }
            }
        }

        [HttpPost("forgotpassword")]
        public async Task<Acknowledgement> ForgotPassword(string emailAddress)
        {
            if (String.IsNullOrEmpty(emailAddress))
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
                        var tempPassword = commonService.RandomString(12);
                        var sqlResult = await userService.ForgotPassword(connection, emailAddress.ToLower().Trim(), tempPassword);
                        var mailContent = mailWrapper.GenerateMail(EnumContainer.MailTemplate.ForgotPassword);
                        var emailResult = mailService.SendMail(connection, new CustomMailRequest(emailAddress, mailContent.Subject, mailContent.Message.Replace("@ReqResetedPassword", tempPassword)));
                        if (emailResult && sqlResult)
                        {
                            return new Acknowledgement("Mail sent Successful", true);
                        }
                        else
                        {
                            return new Acknowledgement("Failure");
                        }
                    }
                }
            }
        }

        [HttpPost("changepassword")]
        public async Task<Acknowledgement> ChangePassword(string emailAddress, string password)
        {
            if (String.IsNullOrEmpty(emailAddress))
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
                        var sqlResult = await userService.ChangePassword(connection, emailAddress.ToLower().Trim(), password);
                        if (sqlResult)
                        {
                            return new Acknowledgement("Password Changed", true);
                        }
                        else
                        {
                            return new Acknowledgement("Failure");
                        }
                    }
                }
            }
        }
    }
}
