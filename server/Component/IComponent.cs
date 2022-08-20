namespace server.Component;

public interface IComponent
{
    public List<string> Keys { set; get; }

    public string GetQuery();
}