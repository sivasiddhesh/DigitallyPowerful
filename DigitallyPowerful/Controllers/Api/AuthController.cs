using DigitallyPowerful.Services.Database;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DigitallyPowerful.Controllers.Api
{
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private DatabaseContext DatabaseContext { get; set; }
        public AuthController(DatabaseContext databaseContext)
        {
            this.DatabaseContext = databaseContext;
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
    }
}
