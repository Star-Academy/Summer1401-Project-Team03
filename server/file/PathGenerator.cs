namespace server.file;

public static class PathGenerator
{
    public static string GenerateDataPath(string fileName, string fileType, int fileId)
    {
        return Path.Combine(Directory.GetCurrentDirectory(), "resources", "user_files",
            $"{fileName}_{fileId}.{fileType}");
    }

    public static string GeneratePipelinePath(int pipelineId)
    {
        return Path.Combine(Directory.GetCurrentDirectory(), "resources", "pipelines", pipelineId.ToString());
    }

    public static string GetPipelineDirectory()
    {
        return Path.Combine(Directory.GetCurrentDirectory(), "resources", "pipelines");
    }
}