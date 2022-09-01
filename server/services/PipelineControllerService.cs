using server.file;
using server.pipelines;

namespace server.services;

public class PipelineControllerService
{
    public Dictionary<int, Pipeline> IdToPipeline { get; }= new ();
    public PipelineControllerService()
    {
        LoadPipelines();
    }
    
    private void LoadPipelines()
    {
        var path = PathGenerator.GetPipelineDirectory();
        foreach (var filePath in Directory.GetFiles(path))
        {
            var information = FileOperation.Instance.ReadPipeline(filePath);
            IdToPipeline[information.Id] = new Pipeline(information);
        }
    }
}