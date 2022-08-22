namespace server.Transform;

public class Replicate : ITransformer
{
    public List<string> Keys { get; set; }

    public List<IComponent> PreviousComponents { get; set; }

    public string GetQuery()
    {
        return PreviousComponents[0].GetQuery();
    }
}