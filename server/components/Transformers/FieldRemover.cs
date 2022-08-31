using server.enums;

namespace server.components.Transformers;

public class FieldRemover : Transformer
{
    private const string Fields = "fields_to_remove";

    public FieldRemover()
    {
        Type = ComponentType.FieldRemover;
    }

    public override string GetQuery()
    {
        if (!IsConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        return Pipeline.QueryBuilder.Select(GetKeys(), PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys().Except(Parameters[Fields]).ToList();
    }
}