using server.Pipelines;

namespace server.Components.Transformers;

public abstract class Transformer : Component
{
    public List<Component> PreviousComponents { set; get; }

    public Transformer(Pipeline pipeline) : base(pipeline)
    {
        PreviousComponents = new List<Component>();
    }

    public override string GetTable()
    {
        return PreviousComponents[0].GetTable();
    }
}