namespace DigitallyPowerful.Models
{
    public class LoginResponse
    {
        public long Id { get; set; }
        public long RoleTypeId { get; set; }
        public bool IsResetPassword { get; set; }
    }
}
