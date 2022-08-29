using System.Text.Json;
using server.Information;
using server.Pipelines;
using FileOperation = System.IO.File;

namespace server.file;

public class FileWriter
{
    public static FileWriter Instance = new ();

    public void WritePipeline(Pipeline pipeline)
    {
        var info = new PipelineInformation(pipeline);
        var jsonString = JsonSerializer.Serialize(info);
        var pipelinePath = PathGenerator.GeneratePipelinePath(pipeline.Id);
        FileOperation.WriteAllText(pipelinePath, jsonString);
    }
}