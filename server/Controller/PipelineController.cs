using System.Diagnostics.Metrics;
using a;
using Microsoft.AspNetCore.Mvc;
using server.Components.Extractors;
using server.Components.Transformers;
using server.Enums;
using server.Pipelines;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class PipelineController : ControllerBase
{
    private Dictionary<int, Pipeline> idToPipeline;
    private int _counter;
    [HttpPost]
    public IActionResult Create(string pipelineName)
    {
        var dbConfiguration = DBConfigLoader.Load();
        //TODO consider id
        var pipeline = new Pipeline(dbConfiguration.Host, dbConfiguration.Username, dbConfiguration.Database,
            dbConfiguration.Password);

        _counter++;
        idToPipeline[_counter] = pipeline;
        return Ok(_counter);
    }

    [HttpPost]
    public IActionResult AddTransformer(int pipelineID, int previousComponentId, int nextComponentId, int x, int y,[FromBody] Dictionary<string, string> dictionary)
    {
        var filter = new Filter(idToPipeline[pipelineID], dictionary["field"], dictionary["operator"].GetOperator(), dictionary["value"]);
        filter.PreviousComponents.Add(idToPipeline[pipelineID].IdToComponent[previousComponentId]);
        idToPipeline[pipelineID].IdToComponent[nextComponentId].PreviousComponents.Add(filter);
        idToPipeline[pipelineID].AddComponent(filter);
        return Ok(filter.Id);
    }
    
    // get data set
    //

    [HttpPost]
    public void AddSource(int piplelineID, int fileName, int fileID)
    {
        var extractor = new CSVExtractor(idToPipeline[piplelineID], Directory.GetCurrentDirectory() + $"")
    }

    [HttpPost]
    public void AddDestination()
    {
        
    }
}