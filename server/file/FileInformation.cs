using System.Text.RegularExpressions;

namespace server.file;

public class FileInformation
{
    public FileInformation(string name, string id, string type, string category, string createTime)
    {
        this.id = id;
        this.type = type;
        this.name = name;
        this.category = category;
        this.createTime = createTime;
    }

    public string name { get; }
    public string id { get; }
    public string type { get; }
    public string category { get; }
    public string createTime { get; }
    
    public static void ExtractInformation(List<FileInformation> informations, string category)
    {
        var directory = new DirectoryInfo(@"resources\" + category);
        var files = directory.GetFiles("*");

        foreach (var file in files)
        {
            var fullName = file.Name;
            var regex = new Regex("(.*)_([0-9]*)\\.(csv|json)");

            var match = regex.Match(fullName);

            var name = match.Groups[1].Value;
            var id = match.Groups[2].Value;
            var type = match.Groups[3].Value;

            var information = new FileInformation(name, id, type, category, file.CreationTime.ToString());
            informations.Add(information);
        }
    }
}