using server.Enums;

namespace server.Components.Transformers;

public class Hash : Transformer
{
    private const string HashFunction = "h_int";

    public Hash()
    {
        Type = ComponentType.Hash;
    }

    private const string FieldToHash = "field_to_hash";
    private const string ShouldCreateNewField = "should_create_new_field";
    private const string NewFieldName = "new_field_name";


    public override string GetQuery()
    {
        var newFieldSelectCommand =
            $"{HashFunction}({Parameters[FieldToHash][0]}) AS {Parameters[NewFieldName][0]}";
        var keys = GetKeys();
        keys[keys.IndexOf(Parameters[NewFieldName][0])] = newFieldSelectCommand;

        return Pipeline.QueryBuilder.Select(keys, PreviousComponents[0].GetQuery(), Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        var keys = PreviousComponents[0].GetKeys();

        if (bool.Parse(Parameters[ShouldCreateNewField][0]))
            keys.Add(Parameters[NewFieldName][0]);
        else
            keys[keys.IndexOf(Parameters[FieldToHash][0])] = Parameters[NewFieldName][0];

        return keys;
    }
}