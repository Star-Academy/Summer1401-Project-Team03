using server.Component;

namespace server.Transform;

public class Replicate : ITransformer
{
    public List<string> Keys { get; set; }
    public string GetQuery()
    {
        return PreviousComponents[0].GetQuery();
    }

    public List<IComponent> PreviousComponents { get; set; }
}