using server.enums;

namespace server.components.Transformers;

public class DataSampling : Transformer
{
    private const string Number = "number";

    public DataSampling()
    {
        Type = ComponentType.DataSampling;
    }

    public override string GetQuery()
    {
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        return Pipeline.QueryBuilder.Sample(PreviousComponents[0].GetQuery(), Pipeline.QueryBuilder.NewAlias(),
            int.Parse(Parameters[Number][0]));
    }
}