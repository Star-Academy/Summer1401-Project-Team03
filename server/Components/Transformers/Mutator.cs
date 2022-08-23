using server.Pipelines;

namespace server.Components.Transformers;

public abstract class Mutator : Transformer
{
    public Mutator(Pipeline pipeline, Position position) : base(pipeline, position)
    {
    }

    public string TableName { set; get; }

    public override string GetTable()
    {
        return TableName;
    }

    public abstract void Mutate();
}