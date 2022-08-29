using System.Text.Json;
using server.Pipelines;
using FileOperation = System.IO.File;

namespace server.file;

public class FileWriter
{
    public static FileWriter Instance = new ();

    public void WritePipeline(Pipeline pipeline)
    {
        
        var info = PipelineInformationPipelineAdapter.InformationFromPipeline(pipeline);
        var jsonString = JsonSerializer.Serialize(info);
        var pipelinePath = PathGenerator.GeneratePipelinePath(pipeline.id);
        FileOperation.WriteAllText(pipelinePath, jsonString);

    }
}