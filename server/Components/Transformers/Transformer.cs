using server.Pipelines;

namespace server.Components.Transformers;

public abstract class Transformer : Component
{
    public Transformer(Pipeline pipeline) : base(pipeline)
    {
        PreviousComponents = new List<Component>();
    }

    public List<Component> PreviousComponents { set; get; }

    public override string GetTable()
    {
        return PreviousComponents[0].GetTable();
    }
}