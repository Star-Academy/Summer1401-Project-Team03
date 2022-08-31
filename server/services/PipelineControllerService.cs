using server.file;
using server.Pipelines;

namespace DefaultNamespace;

public class PipelineControllerService
{
    public Dictionary<int, Pipeline> IdToPipeline { get; }= new ();
    public PipelineControllerService()
    {
        LoadPipelines();
    }
    
    public void LoadPipelines()
    {
        var path = PathGenerator.GetPipelineDirectory();
        foreach (var filePath in Directory.GetFiles(path))
        {
            var information = FileOperation.Instance.ReadPipeline(filePath);
            IdToPipeline[information.Id] = new Pipeline(information);
        }
    }
}