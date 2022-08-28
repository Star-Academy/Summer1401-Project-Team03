using server.Pipelines;

namespace server.Components.Transformers;

public abstract class Transformer : Component
{
    public Transformer() : base()
    {
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys();
    }
}