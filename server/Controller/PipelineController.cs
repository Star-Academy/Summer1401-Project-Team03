using System.Diagnostics.Metrics;
using a;
using Microsoft.AspNetCore.Mvc;
using server.Components;
using server.Components.Extractors;
using server.Components.Loaders;
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
        // var filter = new Filter(idToPipeline[pipelineID], dictionary["field"], dictionary["operator"].GetOperator(), dictionary["value"]);
        // filter.PreviousComponents.Add(idToPipeline[pipelineID].IdToComponent[previousComponentId]);
        // idToPipeline[pipelineID].IdToComponent[nextComponentId].PreviousComponents.Add(filter);
        // idToPipeline[pipelineID].AddComponent(filter);
        // return Ok(filter.Id);
        throw new NotImplementedException();
    }
    
    // get data set
    //

    [HttpPost]
    public IActionResult AddSource(int pipelineID, string fileName, int fileID, string fileType, double x, double y)
    {
        var extractor = new CSVExtractor(idToPipeline[pipelineID], new Position(x,y),
            Environment.CurrentDirectory + "\\resources\\exports\\" + fileName + "_" + fileID + "." + fileType );
        
        idToPipeline[pipelineID].AddComponent(extractor);

        return Ok(extractor.Id);
    }

    [HttpPost]
    public IActionResult AddDestination(int pipelineId, string fileName, int fileId, string fileType, double x, double y, int previousComponentId)
    {
        var loader = new CSVLoader(idToPipeline[pipelineId], new Position(x, y),
            Environment.CurrentDirectory + "\\resources\\imports\\" + fileName + "_" + fileId + "." + fileType);
        
        loader.PreviousComponents.Add(idToPipeline[pipelineId].IdToComponent[previousComponentId]);
        
        idToPipeline[pipelineId].AddComponent(loader);

        return Ok(loader.Id);
    }
}