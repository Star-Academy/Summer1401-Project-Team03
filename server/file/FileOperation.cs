using System.Text.Json;
using server.Information;
using server.Pipelines;
using FileOperation = System.IO.File;

namespace server.file;

public class FileOperation
{
    public static FileOperation Instance = new ();

    public void WritePipeline(Pipeline pipeline)
    {
        var info = new PipelineInformation(pipeline);
        var jsonString = JsonSerializer.Serialize(info);
        var pipelinePath = PathGenerator.GeneratePipelinePath(pipeline.Id);
        File.WriteAllText(pipelinePath, jsonString);
    }

    public void RemovePipeline(int pipelineID)
    {
        var pipelinePath = PathGenerator.GeneratePipelinePath(pipelineID);
        File.Delete(pipelinePath);
    }

    public PipelineInformation ReadPipeline(int pipelineID)
    {
        var path = PathGenerator.GetPipelineDirectory();

        var directoryInfo = new DirectoryInfo(path);
        var files = directoryInfo.GetFiles("*");

        var file = files.Where(x => x.Name == pipelineID.ToString()).ElementAt(0);

        var jsonFile = File.ReadAllText(file.FullName);
        return JsonSerializer.Deserialize<PipelineInformation>(jsonFile);
    }
    
    public PipelineInformation ReadPipeline(string path)
    {
        var jsonFile = File.ReadAllText(path);
        return JsonSerializer.Deserialize<PipelineInformation>(jsonFile);
    }
}