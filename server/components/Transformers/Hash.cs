using server.Enums;

namespace server.Components.Transformers;

public class Hash : Transformer
{
    private const string HashFunction = "hash";

    public Hash()
    {
        Type = ComponentType.Hash;
    }

    private const string FieldsToHash = "fields_to_hash";

    public override string GetQuery()
    {
        var fieldsToHash = Parameters[FieldsToHash];
        var fieldsToSelect = GetKeys().Except(fieldsToHash).ToList();
        for (int i = 0; i < fieldsToHash.Count; i++)
        {
            fieldsToSelect.Add(
                Pipeline.QueryBuilder.Alias(Pipeline.QueryBuilder.Function(HashFunction, fieldsToHash[i]),
                    fieldsToHash[i]));
        }

        return Pipeline.QueryBuilder.Select(fieldsToSelect, PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys();
    }
}