using server.Enums;

namespace server.Components.Transformers;

public class DataSampling : Transformer
{
    public DataSampling()
    {
        Type = ComponentType.DataSampling;
    }

    public int Number { set; get; }

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Sample(PreviousComponents[0].GetQuery(), Pipeline.QueryBuilder.NewAlias(),
            Number);
    }
}