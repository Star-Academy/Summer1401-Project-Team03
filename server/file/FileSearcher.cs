using System.Text.RegularExpressions;

namespace server.file;

public static class FileSearcher
{
    public static string Search(int fileID, string category)
    {
        var regex = new Regex("(.*)_([0-9]*)\\.(csv|json)");

        var directory = new DirectoryInfo(@"resources\" + category);
        var file = directory.GetFiles("*").Select(x => x.Name)
            .Where(x => regex.Match(x).Groups[2].Value == fileID.ToString());
        var name = file.Select(x => regex.Match(x).Groups[1].Value).ElementAt(0);
        var type = file.Select(x => regex.Match(x).Groups[3].Value).ElementAt(0);
        
        return FilePathGenerator.Path(name, type, fileID, category);
    }
}