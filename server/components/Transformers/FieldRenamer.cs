using server.Enums;

namespace server.Components.Transformers;

public class FieldRenamer : Transformer
{
    public FieldRenamer()
    {
        Type = ComponentType.FieldRenamer;
    }

    private List<string> FieldsToRename { get; }
    private List<string> NewNames { get; }

    public override string GetQuery()
    {
        var selectList = CreateModifiedListForStringsInMap((x, y) => $"{x} AS {y}");

        return Pipeline.QueryBuilder.Select(selectList, PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        return CreateModifiedListForStringsInMap((x, y) => y);
    }

    private Dictionary<string, string> GetNameMap()
    {
        var oldNewNameMap = new Dictionary<string, string>();

        for (var i = 0; i < Parameters["new_names"].Count; i++) oldNewNameMap.Add(Parameters["fields_to_rename"][i], Parameters["new_names"][i]);

        return oldNewNameMap;
    }

    private List<string> CreateModifiedListForStringsInMap(Func<string, string, string> func)
    {
        var modifiedList = new List<string>();
        var map = GetNameMap();

        foreach (var key in PreviousComponents[0].GetKeys())
            modifiedList.Add(map.TryGetValue(key, out var newKey) ? func.Invoke(key, newKey) : key);

        return modifiedList;
    }
}