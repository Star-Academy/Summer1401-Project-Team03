using Microsoft.AspNetCore.Mvc;

namespace server.Controller;

public class ExtractController : ControllerBase
{
    [HttpPost]
    public IActionResult Extract()
    {
        return Ok();
    }
}