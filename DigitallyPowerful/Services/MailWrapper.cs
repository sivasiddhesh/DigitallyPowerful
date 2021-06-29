using DigitallyPowerful.Models;
using static DigitallyPowerful.Models.EnumContainer;

namespace DigitallyPowerful.Services
{
    public class MailWrapper
    {
        public MailWrapper()
        {

        }
        public MailTemplateGenerated GenerateMail(MailTemplate enumContainer)
        {
            var result = new MailTemplateGenerated();
            switch(enumContainer)
            {
                case MailTemplate.ForgotPassword:
                    {
                        result.Subject = "Forgot Password Request";
                        result.Message = $"<div><h3>Your Password has been reset successfully.</h3><span>Your Password is </span><span style=\"background - color: bisque; \">@ReqResetedPassword</span><br><span>Kindly <a href=\"http://digitallypowerful.com/\" target=\"_blank\">click here</a> to navigate to DigitallyPowerful site.</span><a></a><h5></h5></div>";
                        return result;
                    }
                default:
                    return null;
            }
        }
    }
}
