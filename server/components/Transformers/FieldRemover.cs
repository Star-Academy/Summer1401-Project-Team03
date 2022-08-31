using server.Enums;

namespace server.Components.Transformers;

public class FieldRemover : Transformer
{
    private const string Fields = "fields";

    public FieldRemover()
    {
        Type = ComponentType.FieldRemover;
    }

    public override string GetQuery()
    {
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"component type: {Type}, id: {Id}");

        return Pipeline.QueryBuilder.Select(GetKeys(), PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys().Except(Parameters[Fields]).ToList();
    }
}