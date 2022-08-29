using server.Enums;

namespace server.Components.Transformers;

public class Replicate : Transformer
{
    public Replicate()
    {
        Type = ComponentType.Replicate;
    }

    public override string GetQuery()
    {
        return PreviousComponents[0].GetQuery();
    }
}