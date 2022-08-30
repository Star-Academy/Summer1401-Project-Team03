using System.Reflection.Metadata;
using server.Enums;

namespace server.Components.Transformers;

public class Split : Transformer
{

    private const string FirstFields = "first_fields";
    private const string SecondFields = "second_fields";
    private const string NewNames = "new_names";
    private const string Separators = "separators";

    public Split()
    {
        Type = ComponentType.Split;
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
        var tempKeys = PreviousComponents[0].GetKeys();
        tempKeys.AddRange(Parameters[NewNames].ToList());
        return tempKeys;
    }
}