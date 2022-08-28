using server.Pipelines;

namespace server.Components.Transformers;

public class DataSampling : Transformer
{
    public DataSampling() : base()
    {
        Type = "data_sampling";
    }

    public int Number { set; get; }

    public override string GetQuery()
    {
        return QueryBuilder.Sample(PreviousComponents[0].GetQuery(), QueryBuilder.NewAlias(),
            Number);
    }
}