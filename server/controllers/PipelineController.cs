using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Components;
using server.Components.Loaders;
using server.Enums;
using server.file;
using server.Information;
using server.Pipelines;
using FileOperation = System.IO.File;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class PipelineController : ControllerBase
{
    private static readonly Dictionary<int, Pipeline> idToPipeline = new();

    public PipelineController()
    {
        var path = PathGenerator.GetPipelineDirectory();
        foreach (var filePath in Directory.GetFiles(path))
        {
            var information = file.FileOperation.Instance.ReadPipeline(filePath);
            idToPipeline[information.Id] = new Pipeline(information);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public ActionResult<int> Create(string pipelineName, int sourceFileID, string destFileName, string destFileFormat)
    {
        try
        {
            var pipeline = new Pipeline(pipelineName);

            var pipelineID = IDCounterHandler.LoadPipeLineID();
            idToPipeline[pipelineID] = pipeline;
            pipeline.Id = pipelineID;

            IDCounterHandler.SavePipelineID(pipelineID + 1);

            AddSource(pipeline, sourceFileID, new Position(0, 0));
            AddDestination(pipeline, destFileName, destFileFormat, new Position(0, 4));

            pipeline.Connect(1, 2);

            file.FileOperation.Instance.WritePipeline(pipeline);

            return Ok(pipelineID);
        }

        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public ActionResult<int> AddComponent(int pipelineID, int previousComponentId, int nextComponentId,
        Position position, ComponentType type)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];

            var component = new ComponentFactory().CreateComponent(type);

            pipeline.AddComponent(component);
            pipeline.Disconnect(previousComponentId, nextComponentId);
            pipeline.Connect(previousComponentId, component.Id);
            pipeline.Connect(component.Id, nextComponentId);

            component.Position = position;

            file.FileOperation.Instance.WritePipeline(pipeline);
            return Ok(component.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpPut]
    public IActionResult ChangeComponentPosition(int pipelineID, int componentID, Position newPosition)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];
            var component = pipeline.IdToComponent[componentID];

            component.Position = newPosition;

            file.FileOperation.Instance.WritePipeline(pipeline);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public IActionResult SetComponentConfig(int pipelineID, int componentID,
        [FromBody] Dictionary<string, List<string>> configurations)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];
            var component = pipeline.IdToComponent[componentID];

            component.Parameters = configurations;
            file.FileOperation.Instance.WritePipeline(pipeline);

            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    private void AddSource(Pipeline pipeline, int fileID, Position position)
    {
        var filePath = FileSearcher.Search(fileID, "imports");

        var extractor = new ComponentFactory().CreateComponent(ComponentType.CSVExtractor);

        extractor.Pipeline = pipeline;
        extractor.Position = position;
        extractor.Parameters = new Dictionary<string, List<string>> { { "file_path", new List<string> { filePath } } };

        pipeline.AddComponent(extractor);
    }


    private void AddDestination(Pipeline pipeline, string fileName, string format, Position position)
    {
        var fileID = IDCounterHandler.LoadFileID();
        var filePath = PathGenerator.GenerateDataPath(fileName, format, fileID, "exports");

        IDCounterHandler.SaveFileID(fileID + 1);
        var loader = (Loader)new ComponentFactory().CreateComponent(ComponentType.CSVLoader);
        loader.Pipeline = pipeline;
        loader.Position = position;
        loader.Parameters = new Dictionary<string, List<string>> { { "file_path", new List<string> { filePath } } };

        pipeline.AddDestinationId(loader.Id);
        pipeline.AddComponent(loader);
    }

    [EnableCors("CorsPolicy")]
    [HttpDelete]
    public IActionResult DeletePipeline(int pipelineID)
    {
        try
        {
            file.FileOperation.Instance.RemovePipeline(pipelineID);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpDelete]
    public IActionResult DeleteComponent(int pipelineID, int componentID)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];
            var component = pipeline.IdToComponent[componentID];
            var previousIDs = component.PreviousComponents.Select(x => x.Id);
            var nextIDs = component.NextComponents.Select(x => x.Id);

            foreach (var previousID in previousIDs) pipeline.Disconnect(previousID, componentID);

            foreach (var nextID in nextIDs) pipeline.Disconnect(componentID, nextID);

            pipeline.Connect(previousIDs.ElementAt(0), nextIDs.ElementAt(0));
            file.FileOperation.Instance.WritePipeline(pipeline);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
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
    public ActionResult<Dictionary<int, string>> GetPipelinesInformation()
    {
        var informations = new Dictionary<int, string>();

        var path = PathGenerator.GetPipelineDirectory();
        foreach (var filePath in Directory.GetFiles(path))
        {
            var jsonFile = FileOperation.ReadAllText(filePath);
            var information = JsonSerializer.Deserialize<PipelineInformation>(jsonFile);

            informations[information.Id] = information.Name;
        }

        return Ok(informations);
    }


    [EnableCors("CorsPolicy")]
    [HttpGet]
    public ActionResult<PipelineInformation> GetPipelineInformation(int pipelineID)
    {
        try
        {
            return Ok(file.FileOperation.Instance.ReadPipeline(pipelineID));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpGet]
    public ActionResult<ComponentInformation> GetComponent(int pipelineID, int componentID)
    {
        try
        {
            return Ok(new ComponentInformation(idToPipeline[pipelineID].IdToComponent[componentID]));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}