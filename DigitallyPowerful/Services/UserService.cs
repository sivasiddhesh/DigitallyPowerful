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
        public UserService()
        {
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
            try
            {
                var sqlQuery = $"select RoleTypeName from RoleType where Id = @ReqRoleTypeId";
                var result = await connection.QueryAsync<string>(sqlQuery, new { ReqRoleTypeId = roleTypeId });
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public async Task<long> GetUserId(MySqlConnection connection, string emailAddress)
        {
            try
            {
                var sqlQuery = $"select Id from User where EmailAddress = @ReqEmailAddress";
                var result = await connection.QueryAsync<long>(sqlQuery, new { ReqEmailAddress = emailAddress });
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {

            }
            return 0;
        }
        public async Task<LoginResponse> GetLoginDetails(MySqlConnection connection, string emailAddress, string password)
        {
            try
            {
                var sqlQuery = $"select Id as Id,RoleTypeId as RoleTypeId from User where EmailAddress = @ReqEmailAddress and Password = @ReqPassword";
                var result = await connection.QueryAsync<LoginResponse>(sqlQuery, new { ReqEmailAddress = emailAddress, ReqPassword = password });
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public async Task<bool> UpdateLogOn(MySqlConnection connection, string emailAddress)
        {
            try
            {
                var sqlQuery = "Update User set LastLogOn = @ReqLastLogOn where EmailAddress = @ReqEmailAddress";
                await connection.ExecuteAsync(sqlQuery, new
                {
                    ReqLastLogOn = DateTime.UtcNow,
                    ReqEmailAddress = emailAddress
                });
                return true;
            }
            catch(Exception ex)
            {
            }
            return false;
        }
        public async Task<List<InfluencerDetails>> GetInfluencerProfile(MySqlConnection connection, long userId)
        {
            try
            {
                var sqlQuery = $"select u.Id as UserId, "+
                                $"u.EmailAddress as EmailAddress, "+
                                $"u.FirstName as FirstName, " +
                                $"u.LastName as LastName, " +
                                $"u.PhoneNumber as PhoneNumber, " +
                                $"pd.DOB as DOB, " +
                                $"pd.Gender as Gender " +
                                $"from `User` u " +
                                $"left Join PersonalDetails pd on u.Id = pd.UserId " +
                                $"where u.RoleTypeId = 3 and u.Id = @ReqUserId";
                var result = await connection.QueryAsync<InfluencerDetails>(sqlQuery, new { ReqUserId = userId });
                var data = result.ToList();
                if (data != null)
                {
                    for(var i=0; i < data.Count; i++)
                    {
                        data[i].SocialMedia = await GetSocialMedia(connection, data[i].UserId);
                    }
                }
                return data;
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public async Task<List<SocialMedia>> GetSocialMedia(MySqlConnection connection, long userId)
        {
            var sqlQuery = $"select SocialMediaTypeId as SocialMediaTypeId, "+
                                $"OtherTypeName as SocialMediaTypeName, "+
                                $"URL as SocialMediaLink, " +
                                $"FollowersCount as FollowersCount, " +
                                $"CountTypeId as CountTypeId " +
                                $"from SocialMedia sm " +
                                $"where UserId = @ReqUserId";
            var result = await connection.QueryAsync<SocialMedia>(sqlQuery, new { ReqUserId = userId });
            return result.ToList();
        }
        public async Task<List<InfluencerDetails>> GetInfluencerProfile(MySqlConnection connection)
        {
            try
            {
                var sqlQuery = $"select u.Id as UserId, " +
                                $"u.EmailAddress as EmailAddress, " +
                                $"u.FirstName as FirstName, " +
                                $"u.LastName as LastName, " +
                                $"u.PhoneNumber as PhoneNumber, " +
                                $"pd.DOB as DOB, " +
                                $"pd.Gender as Gender " +
                                $"from `User` u " +
                                $"left Join PersonalDetails pd on u.Id = pd.UserId " +
                                $"where u.RoleTypeId = 3 ";
                var result = await connection.QueryAsync<InfluencerDetails>(sqlQuery);
                var data = result.ToList();
                if (data != null)
                {
                    for (var i = 0; i < data.Count; i++)
                    {
                        data[i].SocialMedia = await GetSocialMedia(connection, data[i].UserId);
                    }
                }
                return data;
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public async Task<bool> PostInfluencerProfile(MySqlConnection connection, InfluencerDetails request)
        {
            try
            { 
                var isExistQuery = $"Select * from PersonalDetails where UserId = @ReqUserId";
                var isExist = await connection.QueryAsync(isExistQuery, new { ReqUserId = request.UserId });
                var result = 0;
                if (!isExist.ToList().Any())
                {
                    var InsertSqlQuery = $"INSERT INTO PersonalDetails (UserId, DOB, Gender, CreatedOn, UpdatedOn) VALUES " +
                            $"(@ReqUserId, @ReqDOB, @ReqGender, @ReqCreatedOn, @ReqUpdatedOn)";
                    result = await connection.ExecuteAsync(InsertSqlQuery,
                            new
                            {
                                ReqUserId = request.UserId,
                                ReqDOB = request.DateOfBirth.ToString("yyyy-MM-dd"),
                                ReqGender = request.Gender,
                                ReqCreatedOn = DateTime.UtcNow,
                                ReqUpdatedOn = DateTime.UtcNow
                            });
                }
                else
                {
                    var UpdateSqlQuery = $"Update PersonalDetails Set DOB = @ReqDOB, Gender = @ReqGender, UpdatedOn = @ReqUpdatedOn where UserId = @ReqUserId";
                    result = await connection.ExecuteAsync(UpdateSqlQuery,
                            new
                            {
                                ReqUserId = request.UserId,
                                ReqDOB = request.DateOfBirth.ToString("yyyy-MM-dd"),
                                ReqGender = request.Gender,
                                ReqUpdatedOn = DateTime.UtcNow
                            });
                }
                if(result > 0)
                {
                    var deleteSqlQuery = $"delete from SocialMedia where UserId = @ReqUserId";
                    var deleteResult = await connection.ExecuteAsync(deleteSqlQuery,
                        new
                        {
                            ReqUserId = request.UserId
                        });
                    foreach (var item in request.SocialMedia)
                    {
                        var SocialMediaSqlQuery = $"INSERT INTO SocialMedia (SocialMediaTypeId,OtherTypeName, UserId, URL, FollowersCount, CountTypeId, CreatedOn, UpdatedOn) VALUES " +
                            $"(@ReqSocialMediaTypeId, @ReqOtherTypeName, @ReqUserId, @ReqUrl, @ReqFollowersCount, @ReqCountTypeId, @ReqCreatedOn, @ReqUpdatedOn)";
                        await connection.ExecuteAsync(SocialMediaSqlQuery,
                            new
                            {
                                ReqSocialMediaTypeId = item.SocialMediaTypeId,
                                ReqOtherTypeName = item.SocialMediaTypeName,
                                ReqUserId = request.UserId,
                                ReqUrl = item.SocialMediaLink,
                                ReqFollowersCount = item.FollowersCount,
                                ReqCountTypeId = item.CountTypeId,
                                ReqCreatedOn = DateTime.UtcNow,
                                ReqUpdatedOn = DateTime.UtcNow
                            });
                    }
                }
                return true;
            }
            catch(Exception ex)
            {

            }
            return false;
        }
        public async Task<List<BrandDetails>> GetBrandDetails(MySqlConnection connection, long userId)
        {
            try
            {
                var sqlQuery = $"select u.Id as UserId, " +
                                $"u.EmailAddress as EmailAddress, " +
                                $"u.FirstName as FirstName, " +
                                $"u.LastName as LastName, " +
                                $"u.PhoneNumber as PhoneNumber, " +
                                $"b.ProjectTypeId as ProjectTypeId, " +
                                $"b.BrandDescription as BrandDescription , " +
                                $"b.ProjectName as ProjectName " +
                                $"from `User` u " +
                                $"left join Brand b on u.Id  = b.UserId  " +
                                $"where u.RoleTypeId = 2 and u.Id = @ReqUserId";
                var result = await connection.QueryAsync<BrandDetails>(sqlQuery, new { ReqUserId = userId });
                var data = result.ToList();
                return data;
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public async Task<List<BrandDetails>> GetBrandDetails(MySqlConnection connection)
        {
            try
            {
                var sqlQuery = $"select u.Id as UserId, " +
                                $"u.EmailAddress as EmailAddress, " +
                                $"u.FirstName as FirstName, " +
                                $"u.LastName as LastName, " +
                                $"u.PhoneNumber as PhoneNumber, " +
                                $"b.ProjectTypeId as ProjectTypeId, "+
                                $"b.BrandDescription as BrandDescription , " +
                                $"b.ProjectName as ProjectName " +
                                $"from `User` u " +
                                $"left join Brand b on u.Id  = b.UserId  " +
                                $"where u.RoleTypeId = 2 ";
                var result = await connection.QueryAsync<BrandDetails>(sqlQuery);
                var data = result.ToList();
                return data;
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public async Task<bool> PostBrandDetails(MySqlConnection connection, BrandDetails request)
        {
            try
            {
                var isExistQuery = $"Select * from Brand where UserId = @ReqUserId";
                var isExist = await connection.QueryAsync(isExistQuery, new { ReqUserId = request.UserId });
                if (!isExist.ToList().Any())
                {
                    var InsertSqlQuery = $"INSERT INTO Brand (UserId, ProjectTypeId, ProjectName, BrandDescription, CreatedOn, UpdatedOn) VALUES " +
                            $"(@ReqUserId, @ReqProjectTypeId, @ReqProjectName, @ReqBrandDescription, @ReqCreatedOn, @ReqUpdatedOn)";
                    var result = await connection.ExecuteAsync(InsertSqlQuery,
                            new
                            {
                                ReqUserId = request.UserId,
                                ReqProjectTypeId = request.ProjectTypeId,
                                ReqProjectName = request.ProjectName,
                                ReqBrandDescription = request.BrandDescription,
                                ReqCreatedOn = DateTime.UtcNow,
                                ReqUpdatedOn = DateTime.UtcNow
                            });
                    return result > 0;
                }
                else
                {
                    var UpdateSqlQuery = $"Update Brand Set ProjectTypeId = @ReqProjectTypeId, ProjectName = @ReqProjectName, BrandDescription = @ReqBrandDescription ,UpdatedOn = @ReqUpdatedOn where UserId = @ReqUserId";
                    var result = await connection.ExecuteAsync(UpdateSqlQuery,
                            new
                            {
                                ReqUserId = request.UserId,
                                ReqProjectTypeId = request.ProjectTypeId,
                                ReqProjectName = request.ProjectName,
                                ReqBrandDescription = request.BrandDescription,
                                ReqUpdatedOn = DateTime.UtcNow
                            });
                    return result > 0;
                }
            }
            catch (Exception ex)
            {

            }
            return false;
        }
    }
}
