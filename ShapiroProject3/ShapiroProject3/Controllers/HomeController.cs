using Microsoft.AspNetCore.Mvc;
using ShapiroProject3.Models;
using ShapiroProject3.Services;
using System.Diagnostics;

namespace ShapiroProject3.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        //public IActionResult Privacy()
        //{
        //    return View();
        //}

        public async Task<IActionResult> About()
        {
            //need to go get the data
            DataRetrivel dr = new DataRetrivel();


            //need to stuff data into model
            var loadedAbout = await dr.GetData("about/");
            //cast data string into JSON
            

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
