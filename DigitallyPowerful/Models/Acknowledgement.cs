using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitallyPowerful.Models
{
    public class Acknowledgement
    {
        public string Message { get; set; }
        public long UserId { get; set; }
        public long RoleTypeId { get; set; }
        public string RoleTypeName { get; set; }
        public bool IsResetPassword { get; set; }
        public bool IsSuccess { get; set; }
        public Acknowledgement(string message)
        {
            Message = message;
        }
        public Acknowledgement(string message, long userId, long roleTypeId, string roleTypeName, bool isResetPassword = false)
        {
            Message = message;
            UserId = userId;
            RoleTypeId = roleTypeId;
            RoleTypeName = roleTypeName;
            IsResetPassword = isResetPassword;
            IsSuccess = true;
        }
        public Acknowledgement(string message, bool isSuccess)
        {
            Message = message;
            IsSuccess = isSuccess;
        }
    }
}
