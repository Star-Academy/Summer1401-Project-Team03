namespace server.file;

public static class FilePathGenerator
{
    public static string Path(string fileName, string fileType, int fileId, string fileCategory)
    {
        return System.IO.Path.Combine(Directory.GetCurrentDirectory(), "resources", fileCategory,
            $"{fileName}_{fileId}.{fileType}");
    }
}