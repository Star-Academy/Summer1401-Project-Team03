using server.Enums;

namespace server.Components.Transformers;

public class Replicate : Transformer
{
    public Replicate()
    {
        Type = ComponentType.Replicate;
    }

    public override string GetQuery()
    {
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"component type: {Type}, id: {Id}");

        return PreviousComponents[0].GetQuery();
    }
}