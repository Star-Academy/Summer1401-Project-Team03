using server.enums;

namespace server.components.Transformers;

public class DataCleanser : Transformer
{

    private const string Fields = "fields";
    private const string Values = "default_values";
    private const string Types = "types";

    public DataCleanser()
    {
        Type = ComponentType.DataCleanser;
    }

    public override string GetQuery()
    {
        if (!IsConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        var selectList = GetKeysForQuery();
        return Pipeline.QueryBuilder.Select(selectList, PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }
    
    private List<string> GetKeysForQuery()
    {
        var keys = new List<string>();
        keys.AddRange(PreviousComponents[0].GetKeys());

        for (var i = 0; i < Parameters[Fields].Count; i++)
        {
            keys[keys.IndexOf(Parameters[Fields][i])] = $"COALESCE({Parameters[Fields][i]}, {ModifyByType(Parameters[Types][i], Parameters[Values][i])}) AS {Parameters[Fields][i]}";
        }
        
        return keys;
    }

    private string ModifyByType(string type, string value)
    {
        if (type is "string" or "text")
        {
            return "'" + value + "'";
        }

        return value;
    }
    
}