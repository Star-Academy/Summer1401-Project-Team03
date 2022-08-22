using server.Components;
using server.Components.Transformers;

namespace server.Transform;

public class Replicate : Transformer
{
    public List<string> Keys { get; set; }

    public List<Component> PreviousComponents { get; set; }

    public override string GetQuery()
    {
        return PreviousComponents[0].GetQuery();
    }
}