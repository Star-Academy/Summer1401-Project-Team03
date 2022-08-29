using server.Enums;

namespace server.Components.Transformers;

public class Hash : Transformer
{
    private const string HashFunction = "h_int";

    public Hash()
    {
        Type = ComponentType.Hash;
    }

    private string FieldToHash { get; set; }
    private bool ShouldCreateNewField { get; set; }
    private string NewFieldName { get; set; }


    public override string GetQuery()
    {
        var newFieldSelectCommand = $"{HashFunction}({Parameters["field_to_hash"][0]}) AS {Parameters["new_field_name"][0]}";
        var keys = GetKeys();
        keys[keys.IndexOf(Parameters["new_field_name"][0])] = newFieldSelectCommand;

        return Pipeline.QueryBuilder.Select(keys, PreviousComponents[0].GetQuery(), Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        var keys = PreviousComponents[0].GetKeys();

        if (bool.Parse(Parameters["should_create_new_field"][0]))
            keys.Add(Parameters["new_field_name"][0]);
        else
            keys[keys.IndexOf(Parameters["field_to_hash"][0])] = Parameters["new_field_name"][0];

        return keys;
    }
}