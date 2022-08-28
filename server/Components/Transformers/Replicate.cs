using server.Pipelines;

namespace server.Components.Transformers;

public class Replicate : Mutator
{
    private readonly int _branches = 2;

    public Replicate(Pipeline pipeline, Position position) : base(pipeline, position)
    {
        Name = $"replicate";
    }

    public override string GetQuery()
    {
        TableName = Pipeline.TableManager.NewTableName();
        Mutate();
        return Pipeline.QueryBuilder.SelectTable(TableName);
    }

    public override void Mutate()
    {
        Pipeline.Database.Execute(Pipeline.QueryBuilder.Drop(TableName)).Close();
        var query = Pipeline.QueryBuilder.Copy(TableName, PreviousComponents[0].GetQuery());
        Pipeline.Database.Execute(query).Close();
    }
}