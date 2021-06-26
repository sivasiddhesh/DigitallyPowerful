using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace DigitallyPowerful.Services
{
    public class LogService
    {
        public async Task<bool> SaveLog(MySqlConnection connection,string MethodName,
            string RequestInput, string Message)
        {
            var insertQuery = $"INSERT INTO Log(MethodName, RequestInput, Message, CreatedOn)VALUES "+
                $"(@reqMethodName, @reqRequestInput, @reqMessage, @reqCreatedOn)";
            await connection.ExecuteAsync(insertQuery,
                new
                {
                    reqMethodName = MethodName,
                    reqRequestInput = RequestInput,
                    reqMessage = Message,
                    reqCreatedOn = DateTime.UtcNow
                });
            return true;
        }
        public bool SaveLogSync(MySqlConnection connection, string MethodName,
            string RequestInput, string Message)
        {
            var insertQuery = $"INSERT INTO Log(MethodName, RequestInput, Message, CreatedOn)VALUES " +
                $"(@reqMethodName, @reqRequestInput, @reqMessage, @reqCreatedOn)";
            connection.Execute(insertQuery,
                new
                {
                    reqMethodName = MethodName,
                    reqRequestInput = RequestInput,
                    reqMessage = Message,
                    reqCreatedOn = DateTime.UtcNow
                });
            return true;
        }
    }
}
