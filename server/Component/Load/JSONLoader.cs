using server.Component;

namespace server.Load;

public class JSONLoader : ILoader
{
    public List<string> Keys { get; set; }
    public string GetQuery()
    {
        throw new NotImplementedException();
    }

    public IComponent PreviousComponent { get; set; }
    public string FilePath { get; set; }
    public void Load(string query)
    {
        throw new NotImplementedException();
    }
}