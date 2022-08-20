namespace server.Extract;

using Component;

public interface IExtractor : IComponent
{
    public string TableName { set; get; }

    public void Extract(string dataPath);
}