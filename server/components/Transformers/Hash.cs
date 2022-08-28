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
        var newFieldSelectCommand = $"{HashFunction}({FieldToHash}) AS {NewFieldName}";
        var keys = GetKeys();
        keys[keys.IndexOf(NewFieldName)] = newFieldSelectCommand;

        return QueryBuilder.Select(keys, PreviousComponents[0].GetQuery(), QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        var keys = PreviousComponents[0].GetKeys();

        if (ShouldCreateNewField)
            keys.Add(NewFieldName);
        else
            keys[keys.IndexOf(FieldToHash)] = NewFieldName;

        return keys;
    }
}