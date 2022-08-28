using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Components;
using server.Components.Extractors;
using server.Components.Loaders;
using server.Enums;
using server.file;
using server.Pipelines;
using FileOperation = System.IO.File;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class PipelineController : ControllerBase
{
    private static readonly Dictionary<int, Pipeline> idToPipeline = new();

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public ActionResult<int> Create(string pipelineName, int sourceFileID, string destFileName, string destFileFormat)
    {
        try
        {
            var pipeline = new Pipeline(pipelineName);

            var pipelineID = IDCounterHandler.LoadPipeLineID();
            idToPipeline[pipelineID] = pipeline;
            pipeline.id = pipelineID;

            IDCounterHandler.SavePipelineID(pipelineID + 1);

            AddSource(pipeline, sourceFileID, new Position(0, 0));
            AddDestination(pipeline, destFileName, destFileFormat, new Position(0, 4), 1);

            var info = PipelineInformationPipelineAdapter.InformationFromPipeline(pipeline);
            var jsonString = JsonSerializer.Serialize(info);

            var pipelinePath = PathGenerator.GeneratePipelinePath(pipelineID);
            FileOperation.WriteAllText(pipelinePath, jsonString);
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

            var component = new ComponentFactory().CreateNewComponent(type);

            pipeline.AddComponent(component);
            // TODO Connect to adjacent

            return Ok(component.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e);
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
        
        var extractor = (Extractor) new ComponentFactory().CreateNewComponent(ComponentType.CSVExtractor);

        extractor.QueryBuilder = pipeline.QueryBuilder;
        extractor.Database = pipeline.Database;
        extractor.Position = position;
        extractor.Parameters = new Dictionary<string, List<string>> {{"file_path", new List<string> {filePath}}};
        
        pipeline.AddComponent(extractor);
    }


    private void AddDestination(Pipeline pipeline, string fileName, string format, Position position,
        int previousComponentId)
    {
        var fileID = IDCounterHandler.LoadFileID();
        var filePath = PathGenerator.GenerateDataPath(fileName, format, fileID, "exports");

        IDCounterHandler.SaveFileID(fileID + 1);
        var loader = (Loader) new ComponentFactory().CreateNewComponent(ComponentType.CSVLoader);
        loader.QueryBuilder = pipeline.QueryBuilder;
        loader.Database = pipeline.Database;
        loader.Position = position;
        loader.Parameters = new Dictionary<string, List<string>> {{"file_path", new List<string> {filePath}}};

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
    public ActionResult<Dictionary<int, string>> GetPipelinesInformation()
    {
        var informations = new Dictionary<int, string>();

        var path = PathGenerator.GetPipelineDirectory();
        foreach (var filePath in Directory.GetFiles(path))
        {
            var jsonFile = FileOperation.ReadAllText(filePath);
            var information = JsonSerializer.Deserialize<PipelineInformation>(jsonFile);

            informations[information.ID] = information.Name;
        }

        return Ok(informations);
    }


    [EnableCors("CorsPolicy")]
    [HttpGet]
    public ActionResult<List<PipelineInformation>> GetPipelineInformation(int pipelineID)
    {
        try
        {
            var path = PathGenerator.GetPipelineDirectory();

            var directoryInfo = new DirectoryInfo(path);
            var files = directoryInfo.GetFiles("*");

            var file = files.Where(x => x.Name == pipelineID.ToString()).ElementAt(0);

            return Ok(FileOperation.ReadAllText(file.FullName));
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
            return Ok(ComponentInformationAdaptor.GetInformationFromComponent(idToPipeline[pipelineID]
                .IdToComponent[componentID]));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}