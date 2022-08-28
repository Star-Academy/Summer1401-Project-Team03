namespace server.file;

public static class PathGenerator
{
    public static string GenerateDataPath(string fileName, string fileType, int fileId, string fileCategory)
    {
        return Path.Combine(Directory.GetCurrentDirectory(), "resources", fileCategory,
            $"{fileName}_{fileId}.{fileType}");
    }
    
    public static string GeneratePipelinePath(int pipelineID)
    {
        return Path.Combine(Directory.GetCurrentDirectory(), "resources", "pipelines" , pipelineID.ToString());
    }
}