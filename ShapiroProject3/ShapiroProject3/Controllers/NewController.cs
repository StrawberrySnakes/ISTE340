using Microsoft.AspNetCore.Mvc;

namespace ShapiroProject3.Controllers
{
    public class NewController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
