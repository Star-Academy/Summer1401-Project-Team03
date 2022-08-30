using server.Enums;

namespace server.Components.Transformers;

public class DataSampling : Transformer
{
    public DataSampling()
    {
        Type = ComponentType.DataSampling;
    }

    private const string Number = "number";

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Sample(PreviousComponents[0].GetQuery(), Pipeline.QueryBuilder.NewAlias(),
            int.Parse(Parameters[Number][0]));
    }
}