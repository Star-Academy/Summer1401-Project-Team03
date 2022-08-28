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
        return QueryBuilder.Sample(PreviousComponents[0].GetQuery(), QueryBuilder.NewAlias(),
            Number);
    }
}