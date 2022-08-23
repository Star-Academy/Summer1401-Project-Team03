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
}