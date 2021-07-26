using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitallyPowerful.Controllers
{
    public class UserController : Controller
    {
        // GET: UserController/Login
        public ActionResult Login()
        {
            return View();
        }

        // GET: UserController/Signup for Influencer
        public ActionResult Signup()
        {
            return View();
        }

        // GET: UserController/Signup for Brand
        public ActionResult Sign_up()
        {
            return View();
        }

        // GET: UserController/PasswordChange
        public ActionResult PasswordChange()
        {
            return View();
        }

        // GET: UserController/Influencer
        public ActionResult Influencer()
        {
            string cookie = HttpContext.Request.Cookies["Id"];
            if (!string.IsNullOrEmpty(cookie))
                return View();
            else
                return RedirectToAction("Index", "home");
        }

        // GET: UserController/Brand
        public ActionResult Brand()
        {
            string cookie = HttpContext.Request.Cookies["Id"];
            if (!string.IsNullOrEmpty(cookie))
                return View();
            else
                return RedirectToAction("Index", "home");
        }

        // GET: UserController/Admin
        public ActionResult Admin()
        {
            string cookie = HttpContext.Request.Cookies["Id"];
            if (!string.IsNullOrEmpty(cookie) && cookie=="1")
                return View();
            else
                return RedirectToAction("Index", "home");
        }
    }
}
