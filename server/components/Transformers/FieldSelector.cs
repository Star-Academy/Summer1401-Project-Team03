using server.enums;

namespace server.components.Transformers;

public class FieldSelector : Transformer
{
    private const string Fields = "fields_to_select";

    public FieldSelector()
    {
        Type = ComponentType.FieldSelector;
    }

    public override string GetQuery()
    {
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        return Pipeline.QueryBuilder.Select(Parameters[Fields], PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        return Parameters[Fields];
    }
}