using server.Enums;

namespace server.Components.Transformers;

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
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        var fieldsToHash = Parameters[FieldsToHash];
        var fieldsToSelect = GetKeys().Except(fieldsToHash).ToList();
        for (var i = 0; i < fieldsToHash.Count; i++)
            fieldsToSelect.Add(
                Pipeline.QueryBuilder.Alias(Pipeline.QueryBuilder.Function(HashFunction, fieldsToHash[i]),
                    fieldsToHash[i]));

        return Pipeline.QueryBuilder.Select(fieldsToSelect, PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys();
    }
}