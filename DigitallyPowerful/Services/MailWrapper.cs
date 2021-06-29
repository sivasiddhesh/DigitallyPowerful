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
                        result.Message = "Your Reseted Password = @ReqResetedPassword";
                        return result;
                    }
                default:
                    return null;
            }
            return null;
        }
    }
}
