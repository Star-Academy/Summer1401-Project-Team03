using server.Pipelines;

namespace server.Components.Transformers;

public class DataSampling : Transformer
{
    public DataSampling(Pipeline pipeline, Position position) :
        base(pipeline, position)
    {
        Name = "data_sampling";
    }

    public int Number { set; get; }

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Sample(PreviousComponents[0].GetQuery(), Pipeline.TableManager.NewTableName(),
            Number);
    }
}