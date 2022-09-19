using server.enums;

namespace server.components.Transformers;

public class Concatenate : Transformer
{

    private const string FirstFields = "first_fields";
    private const string SecondFields = "second_fields";
    private const string NewNames = "new_names";
    private const string Separators = "separators";

    public Concatenate()
    {
        Type = ComponentType.Concatenate;
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
        var keys = new List<string>(PreviousComponents[0].GetKeys());

        for (var i = 0; i < Parameters[FirstFields].Count; i++)
        {
            keys.Add(GetFieldForQuery(Parameters[FirstFields][i], Parameters[Separators][i]
                ,Parameters[SecondFields][i],Parameters[NewNames][i]));
        }
        
        return keys;
    }

    private string GetFieldForQuery(string first, string separator, string second, string newName)
    {
        return $"(cast ({first} as varchar(100)) || '{separator}' || cast ({second} as varchar(100))) AS {newName}";
    }

    public override List<string> GetKeys()
    {
        var tempKeys = new List<string>(PreviousComponents[0].GetKeys());
        tempKeys.AddRange(Parameters[NewNames].ToList());
        return tempKeys;
    }
}