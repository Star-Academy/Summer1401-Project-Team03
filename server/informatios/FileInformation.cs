using System.Text.RegularExpressions;

namespace server.informatios;

public class FileInformation
{
    public FileInformation(string name, string id, string type, string category, string createTime, string length)
    {
        Id = id;
        Type = type;
        Name = name;
        Category = category;
        CreateTime = createTime;
        Length = length;
    }

    public string Name { get; }
    public string Id { get; }
    public string Type { get; }
    public string Category { get; }
    public string CreateTime { get; }
    public string Length { get; }

    public static void ExtractInformation(List<FileInformation> informations, string category)
    {
        var directory = new DirectoryInfo(Path.Combine("resources", "user_files"));
        var files = directory.GetFiles("*");

        foreach (var file in files)
        {
            var fullName = file.Name;
            var regex = new Regex("(.*)_([0-9]*)\\.(csv|json)");

            var match = regex.Match(fullName);

            var name = match.Groups[1].Value;
            var id = match.Groups[2].Value;
            var type = match.Groups[3].Value;

            var information = new FileInformation(name, id, type, category, file.CreationTime.ToString(),
                file.Length.ToString());
            informations.Add(information);
        }
    }
}