using Dapper;
using DigitallyPowerful.Models;
using DigitallyPowerful.Services.Database;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitallyPowerful.Services
{
    public class UserService
    {
        private DatabaseContext DatabaseContext { get; set; }
        public UserService(DatabaseContext databaseContext)
        {
            DatabaseContext = databaseContext;
        }
        public async Task<bool> EmailExists(MySqlConnection connection, string EmailAddress)
        {
            try
            {
                    var sqlQuery = $"select EmailAddress from User where EmailAddress = @ReqEmailAddress";
                    var result = await connection.QueryAsync(sqlQuery, new { ReqEmailAddress = EmailAddress });
                    return result.ToList().Any();
            }
            catch(Exception ex)
            {

            }
            return true;
        }

        public async Task<bool> SaveUser(MySqlConnection connection, SignUpRequest request)
        {
            try
            {
                var sqlQuery = $"INSERT INTO `User`(EmailAddress, Password, FirstName, LastName, PhoneNumber, RoleTypeId, CreatedOn) VALUES " +
                    $"(@EmailAddress, @Password, @FirstName, @LastName, @PhoneNumber, @RoleTypeId, @CreatedOn)";
                                           
                    var result = await connection.ExecuteAsync(sqlQuery, 
                        new {   EmailAddress = request.EmailAddress.ToLower().Trim(),
                                Password = request.Password,
                                FirstName = request.FirstName,
                                LastName = request.LastName,
                                PhoneNumber = request.PhoneNumber,
                                RoleTypeId = request.RoleTypeId,
                                CreatedOn = DateTime.UtcNow
                    });
                    return result > 0;
            }
            catch (Exception ex)
            {

            }
            return false;
        }

        public async Task<string> GetRoleTypeName(MySqlConnection connection, long roleTypeId)
        {
            var sqlQuery = $"select RoleTypeName from RoleType where Id = @ReqRoleTypeId";
            var result = await connection.QueryAsync<string>(sqlQuery, new { ReqRoleTypeId = roleTypeId });
            return result.FirstOrDefault();
        }

        public async Task<long> GetUserId(MySqlConnection connection, string emailAddress)
        {
            var sqlQuery = $"select Id from User where EmailAddress = @ReqEmailAddress";
            var result = await connection.QueryAsync<long>(sqlQuery, new { ReqEmailAddress = emailAddress });
            return result.FirstOrDefault();
        }

        public async Task<LoginResponse> GetLoginDetails(MySqlConnection connection, string emailAddress, string password)
        {
            var sqlQuery = $"select Id as Id,RoleTypeId as RoleTypeId from User where EmailAddress = @ReqEmailAddress and Password = @ReqPassword";
            var result = await connection.QueryAsync<LoginResponse>(sqlQuery, new { ReqEmailAddress = emailAddress, ReqPassword = password });
            return result.FirstOrDefault();
        }
    }
}
