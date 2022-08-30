using server.Enums;

namespace server.Components.Transformers;

public class DataCleanser : Transformer
{

    private const string Fields = "fields";
    private const string Values = "values";

    public DataCleanser()
    {
        Type = ComponentType.DataCleanser;
    }

    public override string GetQuery()
    {
        var selectList = GetKeysForQuery();
        return Pipeline.QueryBuilder.Select(selectList, PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }
    
    private List<string> GetKeysForQuery()
    {
        var keys = PreviousComponents[0].GetKeys();

        for (var i = 0; i < Parameters[Fields].Count; i++)
        {
            keys[keys.IndexOf(Parameters[Fields][i])] = $"COALESCE({Parameters[Fields][i]}, {Parameters[Values][i]}) AS {Parameters[Fields][i]}";
        }
        
        return keys;
    }
    
}