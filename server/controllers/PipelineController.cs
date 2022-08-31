using System.Data.Common;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.components;
using server.enums;
using server.file;
using server.informatios;
using server.pipelines;
using server.services;
using FileOperation = System.IO.File;

namespace server.controllers;

[ApiController]
[Route("[controller]/[Action]")]
public class PipelineController : ControllerBase
{
    private static Dictionary<int, Pipeline> _idToPipeline = new();

    public PipelineController(PipelineControllerService pipelineControllerService)
    {
        _idToPipeline = pipelineControllerService.IdToPipeline;
    }

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public ActionResult<int> Create(string pipelineName, int sourceFileId, string destFileName, string destFileFormat)
    {
        try
        {
            var pipeline = new Pipeline(pipelineName);

            var pipelineId = IdCounterHandler.LoadPipeLineId();
            _idToPipeline[pipelineId] = pipeline;
            pipeline.Id = pipelineId;

            IdCounterHandler.SavePipelineId(pipelineId + 1);

            var sourceId = AddSource(pipeline, sourceFileId, new Position(80, 80));
            var destinationId = AddDestination(pipeline, destFileName, destFileFormat, new Position(400, 80));

            pipeline.Connect(sourceId, destinationId);

            file.FileOperation.Instance.WritePipeline(pipeline);

            return Ok(pipelineId);
        }

        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public ActionResult<int> AddComponent(int pipelineId, int previousComponentId, int nextComponentId,
        Position position, ComponentType type, string title)
    {
        try
        {
            var pipeline = _idToPipeline[pipelineId];

            var component = new ComponentFactory().CreateComponent(type, pipeline, position,title);

            pipeline.AddComponent(component);
            pipeline.Disconnect(previousComponentId, nextComponentId);
            pipeline.Connect(previousComponentId, component.Id);
            pipeline.Connect(component.Id, nextComponentId);
            
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
    public IActionResult ChangeComponentPosition(int pipelineId, int componentId, Position newPosition)
    {
        try
        {
            var pipeline = _idToPipeline[pipelineId];
            var component = pipeline.IdToComponent[componentId];

            component.Position = newPosition;

            file.FileOperation.Instance.WritePipeline(pipeline);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CosPolicy")]
    [HttpPut]
    public IActionResult ChangeComponentTitle(int pipelineId, int componentId, string newTitle)
    {
        try
        {
            var pipeline = _idToPipeline[pipelineId];
            var component = pipeline.IdToComponent[componentId];

            component.Title = newTitle;

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
    public IActionResult SetComponentConfig(int pipelineId, int componentId,
        [FromBody] Dictionary<string, List<string>> configurations)
    {
        try
        {
            var pipeline = _idToPipeline[pipelineId];
            var component = pipeline.IdToComponent[componentId];

            component.Parameters = configurations;
            component.IsConfigSet = true;
            file.FileOperation.Instance.WritePipeline(pipeline);

            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    private int AddSource(Pipeline pipeline, int fileId, Position position)
    {
        var filePath = FileSearcher.Search(fileId, "imports");

        var regex = new Regex("(.*)_([0-9]*)\\.(csv|json)");
        var fileName = regex.Match(new FileInfo(filePath).Name).Groups[1].Value;

        var extractor = new ComponentFactory().CreateComponent(ComponentType.CsvExtractor, pipeline, position,fileName);
        
        extractor.Parameters = new Dictionary<string, List<string>> { { "file_path", new List<string> { filePath } } };
        extractor.IsConfigSet = true;
        
        pipeline.AddComponent(extractor);

        return extractor.Id;
    }


    private int AddDestination(Pipeline pipeline, string fileName, string format, Position position)
    {
        var fileId = IdCounterHandler.LoadFileId();
        var filePath = PathGenerator.GenerateDataPath(fileName, format, fileId, "exports");

        IdCounterHandler.SaveFileId(fileId + 1);

        var componentType = format switch
        {
            "json" => ComponentType.JsonLoader,
            _ => ComponentType.CsvLoader
        };

        var loader = new ComponentFactory().CreateComponent(componentType, pipeline, position, fileName);
        loader.Parameters = new Dictionary<string, List<string>> { { "file_path", new List<string> { filePath } } };
        loader.IsConfigSet = true;
        
        pipeline.AddDestinationId(loader.Id);
        pipeline.AddComponent(loader);

        return loader.Id;
    }

    [EnableCors("CorsPolicy")]
    [HttpDelete]
    public IActionResult DeletePipeline(int pipelineId)
    {
        try
        {
            file.FileOperation.Instance.RemovePipeline(pipelineId);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpDelete]
    public IActionResult DeleteComponent(int pipelineId, int componentId)
    {
        try
        {
            var pipeline = _idToPipeline[pipelineId];
            var component = pipeline.IdToComponent[componentId];
            var previousIDs = component.PreviousComponents.Select(x => x.Id).ToList();
            var nextIDs = component.NextComponents.Select(x => x.Id).ToList();

            foreach (var previousId in previousIDs) pipeline.Disconnect(previousId, componentId);
            foreach (var nextId in nextIDs) pipeline.Disconnect(componentId, nextId);

            if (previousIDs.Any() && nextIDs.Any()) pipeline.Connect(previousIDs.ElementAt(0), nextIDs.ElementAt(0));

            if (pipeline.IdToComponent.ContainsKey(componentId)) pipeline.IdToComponent.Remove(componentId);

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
    public IActionResult Run(int pipelineId)
    {
        try
        {
            var pipeline = _idToPipeline[pipelineId];
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
    public IActionResult RunUpTo(int pipelineId, int componentId)
    {
        try
        {
            var pipeline = _idToPipeline[pipelineId];

            using var reader = pipeline.Execute(componentId);

            return Ok(Serialize(reader));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    private IEnumerable<Dictionary<string, object>> Serialize(DbDataReader reader)
    {
        var results = new List<Dictionary<string, object>>();
        var cols = new List<string>();
        for (var i = 0; i < reader.FieldCount; i++)
            cols.Add(reader.GetName(i));

        var j = 0;
        while (reader.Read())
        {
            results.Add(cols.ToDictionary(col => col, col => reader[col]));
            if (j++ > 50) break;
        }

        return results;
    }

    [EnableCors("CorsPolicy")]
    [HttpGet]
    public ActionResult<List<PipelineShortInformation>> GetPipelinesInformation()
    {
        var informations = new List<PipelineShortInformation>();
        var path = PathGenerator.GetPipelineDirectory();
        foreach (var filePath in Directory.GetFiles(path))
        {
            var jsonFile = FileOperation.ReadAllText(filePath);
            var information = JsonSerializer.Deserialize<PipelineInformation>(jsonFile);

            informations.Add(new PipelineShortInformation(information.Name, information.Id));
        }

        return Ok(informations);
    }


    [EnableCors("CorsPolicy")]
    [HttpGet]
    public ActionResult<PipelineInformation> GetPipelineInformation(int pipelineId)
    {
        try
        {
            return Ok(file.FileOperation.Instance.ReadPipeline(pipelineId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpGet]
    public ActionResult<ComponentInformation> GetComponent(int pipelineId, int componentId)
    {
        try
        {
            return Ok(new ComponentInformation(_idToPipeline[pipelineId].IdToComponent[componentId]));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}