using System.Text.RegularExpressions;

namespace server.file;

public static class FileSearcher
{
    public static string Search(int fileId, string category)
    {
        var regex = new Regex("(.*)_([0-9]*)\\.(csv|json)");

        var directory = new DirectoryInfo(Path.Combine("resources", "user_files"));
        var file = directory.GetFiles("*").Select(x => x.Name)
            .Where(x => regex.Match(x).Groups[2].Value == fileId.ToString());
        var name = file.Select(x => regex.Match(x).Groups[1].Value).ElementAt(0);
        var type = file.Select(x => regex.Match(x).Groups[3].Value).ElementAt(0);

        return PathGenerator.GenerateDataPath(name, type, fileId);
    }
}