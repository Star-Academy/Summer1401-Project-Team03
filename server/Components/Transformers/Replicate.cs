using server.Components;
using server.Components.Transformers;
using server.Pipelines;

namespace server.Transform;

public class Replicate : Mutator
{
    private readonly int _branches = 2;
    
    public Replicate(Pipeline pipeline) : base(pipeline)
    {
    }
    
    public override string GetQuery()
    {
        TableName = Pipeline.TableManager.NewTableName();
        Mutate();
        return Pipeline.QueryBuilder.SelectTable(TableName);
    }

    public override void Mutate()
    {
        Pipeline.QueryBuilder.Copy(PreviousComponents[0].GetQuery(), TableName);
    }
}