using System.Data.Common;
using DBConfig;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Components;
using server.Components.Extractors;
using server.Components.Loaders;
using server.Components.Transformers;
using server.Enums;
using server.file;
using server.Pipelines;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class PipelineController : ControllerBase
{
    private static int _counter;
    private static readonly Dictionary<int, Pipeline> idToPipeline = new();

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public IActionResult Create(string pipelineName, int sourceFileID, string destFileName, string destFileFormat)
    {
        try
        {
            var pipeline = new Pipeline(pipelineName);

            _counter++;
            idToPipeline[_counter] = pipeline;
            pipeline.id = _counter;

            AddSource(pipeline, sourceFileID, 0, 0);
            AddDestination(pipeline, destFileName, destFileFormat, 4, 0, 0);

            return Ok(_counter);
        }

        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public IActionResult AddTransformer(int pipelineID, int previousComponentId, int nextComponentId, double x,
        double y,
        [FromBody] Dictionary<string, string> dictionary)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];

            var filter = new Filter(pipeline, new Position(x, y), dictionary["field"],
                dictionary["operator"].GetOperator(), dictionary["value"]);
            
            pipeline.AddComponent(filter);
            filter.ConnectToAdjacentComponents(previousComponentId, nextComponentId);

            return Ok(filter.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    private void AddSource(Pipeline pipeline, int fileID, double x, double y)
    {
        var filePath = FileSearcher.Search(fileID, "imports");
        var extractor = new CSVExtractor(pipeline, new Position(x, y), filePath);

        pipeline.AddComponent(extractor);
    }


    private void AddDestination(Pipeline pipeline, string fileName, string format, double x, double y,
        int previousComponentId)
    {
        DataInventoryController.increaseFileID(1);
        var fileID = DataInventoryController.fileID;
        var filePath = FilePathGenerator.Path(fileName, format, fileID, "exports");

        var loader = new CSVLoader(pipeline, new Position(x, y), filePath);

        loader.PreviousComponents.Add(pipeline.IdToComponent[previousComponentId]);

        pipeline.AddComponent(loader);
    }

    [EnableCors("CorsPolicy")]
    [HttpGet]
    public IActionResult Run(int pipelineID)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];
            pipeline.Execute();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [EnableCors("CorsPolicy")]
    [HttpGet]
    public IActionResult RunUpTo(int pipelineID, int componentID)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];
            pipeline.Execute(componentID).Close();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpGet]
    public void GetPipelinesInformation()
    {
        
    }
}