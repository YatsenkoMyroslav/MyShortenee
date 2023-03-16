using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyShortenee.Dto;
using MyShortenee.Models;

namespace MyShortenee.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AboutController:Controller
{
    static string appDirectory = Environment.CurrentDirectory;
    static string relativePath = Path.Combine(appDirectory, "wwwroot", "About.txt");
    [HttpPost("/save")]
    [Authorize(Roles = UserRoles.Admin)]
    public IActionResult SaveAsAdmin(NewInfo newInfo)
    {
        using (StreamWriter writer = new StreamWriter(relativePath))
        {
            writer.Write(newInfo.NewValue);
        }
        return Ok();
    }

    [HttpGet]
    public IActionResult Get()
    {
        string aboutApplication="";
        using (StreamReader reader = new StreamReader(relativePath))
        {
            aboutApplication = reader.ReadToEnd();
        }
        return Json(aboutApplication);
    }
}