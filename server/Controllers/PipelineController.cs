using System.Text.Json;
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
    private static readonly Dictionary<int, Pipeline> idToPipeline = new();

    public static string JsonPath = Path.Combine(Directory.GetCurrentDirectory(), "json");

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

            System.IO.File.WriteAllText($@"D:\Summer1401-Project-Team03\server\json\{pipeline.id}", jsonString);
            return Ok(pipelineID);
        }

        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public ActionResult<int> AddComponent(int pipelineID, int previousComponentId, int nextComponentId, Position position, TransformerType type)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];

            Component component = null;
            switch (type)
            {
                case TransformerType.Filter:
                    component = new Filter(pipeline, position);
                    break;
                
                case TransformerType.Aggregate:
                    component = new Aggregate(pipeline, position);
                    break;

                // case TransformerType.Hash:
                //     component = new Hash(pipeline, position);
                //     break;

                case TransformerType.DataSampling:
                    component = new DataSampling(pipeline, position);
                    break;

                case TransformerType.FieldRemover:
                    component = new FieldRemover(pipeline, position);
                    break;

                case TransformerType.FieldRenamer:
                    component = new FieldRenamer(pipeline, position);
                    break;

                case TransformerType.TypeConverter:
                    component = new TypeConverter(pipeline, position);
                    break;
                
                case TransformerType.FieldSelector:
                    component = new FieldSelector(pipeline, position);
                    break;
            }
            
            pipeline.AddComponent(component);
            component.ConnectToAdjacentComponents(previousComponentId, nextComponentId);

            return Ok(component.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public IActionResult SetComponentConfig(int pipelineID, int componentID, [FromBody] Dictionary<string, string> configurations)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];
            var component = pipeline.IdToComponent[componentID];
            // component.SetConfig(configurations);
            
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
        var extractor = new CSVExtractor(pipeline, position, filePath);

        pipeline.AddComponent(extractor);
    }


    private void AddDestination(Pipeline pipeline, string fileName, string format, Position position,
        int previousComponentId)
    {
        var fileID = IDCounterHandler.LoadFileID();
        var filePath = FilePathGenerator.Path(fileName, format, fileID, "exports");

        IDCounterHandler.SaveFileID(fileID + 1);
        var loader = new CSVLoader(pipeline, position, filePath);

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
    public ActionResult<Dictionary<int , string>> GetPipelinesInformation()
    {
        var informations = new Dictionary<int, string>();
        
        foreach (var filePath in Directory.GetFiles(JsonPath))
        {
            var jsonFile = System.IO.File.ReadAllText(filePath);
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
            var directoryInfo = new DirectoryInfo(JsonPath);
            var files = directoryInfo.GetFiles("*");

            var file = files.Where(x => x.Name == pipelineID.ToString()).ElementAt(0);

            return Ok(System.IO.File.ReadAllText(file.FullName));
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