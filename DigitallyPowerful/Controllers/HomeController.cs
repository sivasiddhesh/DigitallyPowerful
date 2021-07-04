using DigitallyPowerful.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace DigitallyPowerful.Controllers
{
    public class HomeController : Controller
    {

        public IActionResult home()
        {
            return View();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }

        public ActionResult TermsandCondition()
        {
            return View();
        }

        public ActionResult PrivacyPolicy()
        {
            return View();
        }

        public IActionResult Error()
        {
            return RedirectToAction("Index", "home");
        }
    }
}
