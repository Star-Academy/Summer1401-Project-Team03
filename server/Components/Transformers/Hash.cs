using server.Pipelines;

namespace server.Components.Transformers;

public class Hash : Transformer
{
    public Hash(Pipeline pipeline, Position position, string fieldToHash, bool shouldCreateNewField,
        string newFieldName) : base(pipeline, position)
    {
        FieldToHash = fieldToHash;
        NewFieldName = newFieldName;
        ShouldCreateNewField = shouldCreateNewField;
    }

    private const string HashFunction = "h_int";
    private string FieldToHash { get; set; }
    private bool ShouldCreateNewField { get; set; }
    private string NewFieldName { get; set; }
    

    public override string GetQuery()
    {
        var newFieldSelectCommand = $"{HashFunction}({FieldToHash}) AS {NewFieldName}";
        var keys = GetKeys();
        keys[keys.IndexOf(NewFieldName)] = newFieldSelectCommand;

        return Pipeline.QueryBuilder.Select(keys, PreviousComponents[0].GetQuery(), Pipeline.TableManager.NewTableName());
    }

    public override List<string> GetKeys()
    {
        var keys = PreviousComponents[0].GetKeys();

        if (ShouldCreateNewField)
        {
            keys.Add(NewFieldName);
        }
        else
        {
            keys[keys.IndexOf(FieldToHash)] = NewFieldName;
        }

        return keys;
        
    }
}