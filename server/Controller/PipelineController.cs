using a;
using Microsoft.AspNetCore.Mvc;
using server.Pipelines;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class PipelineController : ControllerBase
{
    [HttpPost]
    public IActionResult Create(int id)
    {
        var dbConfiguration = DBConfigLoader.Load();
        //TODO consider id
        var pipeline = new Pipeline(dbConfiguration.Host, dbConfiguration.Username, dbConfiguration.Database,
            dbConfiguration.Password);
        return Ok();
    }

    [HttpPost]
    public void AddComponent(int pipelineID, int componentID, [FromBody] Dictionary<string, string> dictionary)
    {
        Console.WriteLine(dictionary);
    }
}