using server.enums;

namespace server.components.Transformers;

public class Hash : Transformer
{
    private const string HashFunction = "hash";

    private const string FieldsToHash = "fields_to_hash";

    public Hash()
    {
        Type = ComponentType.Hash;
    }

    public override string GetQuery()
    {
        if (!IsConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        var fieldsToHash = new List<string>(Parameters[FieldsToHash]);
        var fieldsToSelect = new List<string>(GetKeys().Except(fieldsToHash).ToList());
        foreach (var t in fieldsToHash)
            fieldsToSelect.Add(
                Pipeline.QueryBuilder.Alias(Pipeline.QueryBuilder.Function(HashFunction, t),
                    t));

        return Pipeline.QueryBuilder.Select(fieldsToSelect, PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

}