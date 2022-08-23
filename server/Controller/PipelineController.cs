using Microsoft.AspNetCore.Mvc;
using server.Pipelines;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class PipelineController : ControllerBase
{
    [HttpPost]
    public void Create(int id)
    {
        // var pipeline = new Pipeline();
    }
}