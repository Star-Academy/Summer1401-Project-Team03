using server.Enums;

namespace server.Components.Transformers;

public class DataSampling : Transformer
{
    private const string Number = "number";

    public DataSampling()
    {
        Type = ComponentType.DataSampling;
    }

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Sample(PreviousComponents[0].GetQuery(), Pipeline.QueryBuilder.NewAlias(),
            int.Parse(Parameters[Number][0]));
    }
}