using DigitallyPowerful.Models;
using System;
using System.Collections.Generic;
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
                        result.Message = $"<div><h3>Your Password has been reset successfully.</h3><span>Your Password is </span><span style=\"background-color: bisque; \">@ReqResetedPassword</span><br><span>Kindly <a href=\"http://digitallypowerful.com/\" target=\"_blank\">click here</a> to navigate to DigitallyPowerful site.</span><a></a><h5></h5></div>";
                        return result;
                    }
                case MailTemplate.ContactMail:
                    {
                        result.Subject = "Contact Details - "+DateTime.UtcNow.ToString("dd/MM/yyyy");
                        result.Message = "<html><head><style>tr:nth-child(even) {  background - color: #dddddd;}</style></head><body><h2>Contact Details</h2><table style=\"font-family: arial, sans-serif; border-collapse: collapse; width: 100 %; \">  <tr>    <th style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">First Name</th>    <th style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">Last Name</th>    <th style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">Email Address</th> <th style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">DOB</th> <th style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">Gender</th> <th style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">Role</th> <th style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">Phone Number</th>   </tr> @Data </table></body></html>";
                        return result;
                    }
                case MailTemplate.CustomMail:
                    {
                        result.Subject = "Mail Sent From DigitallyPowerful.com - " + DateTime.UtcNow.ToString("dd/MM/yyyy");
                        result.Message = "<div><span>Name : </span><span style=\"background-color: bisque;\">@Name</span><br><span>Email : </span><span style=\"background-color: bisque; \">@Email</span><br><span>Subject : </span><span style=\"background-color: bisque; \">@Subject</span><br><span>Message : </span><span style=\"background-color: bisque; \">@Message</span><br></div>";
                        return result;
                    }
                default:
                    return null;
            }
        }

        public MailTemplateGenerated ContactWrapper(MailTemplateGenerated mailContent, List<ContactDetails> details)
        {
            var result = "";
            foreach(var item in details)
            {
                var date = item.DOB == null ? "" : ((DateTime)item.DOB).ToString("dd-MM-yyyy");
                result = result + "<tr><td style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">" + item.FirstName + "</td><td style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">" + item.LastName + "</td><td style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">" + item.EmailAddress + "</td><td style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">"+ date +  "</td><td style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">" +item.Gender+ "</td><td style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">" + item.Role + "</td><td style=\"border: 1px solid #dddddd;  text-align: left;  padding: 8px;\">" + item.PhoneNumber + "</td></tr>";
            }
            mailContent.Message = mailContent.Message.Replace("@Data", result);
            return mailContent;
        }
    }
}
