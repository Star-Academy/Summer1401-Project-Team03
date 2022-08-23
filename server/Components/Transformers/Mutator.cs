using server.Pipelines;

namespace server.Components.Transformers;

public abstract class Mutator : Transformer
{
    public Mutator(Pipeline pipeline) : base(pipeline)
    {
    }

    public string TableName { set; get; }

    public override string GetTable()
    {
        return TableName;
    }

    public abstract void Mutate();
}