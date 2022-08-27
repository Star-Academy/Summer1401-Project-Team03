using server.Pipelines;

namespace server.Components.Transformers;

public class FieldRenamer : Transformer
{
    public FieldRenamer(Pipeline pipeline, Position position, List<string> fieldsToRename, List<string> newNames) :
        base(pipeline, position)
    {
        FieldsToRename = fieldsToRename;
        NewNames = newNames;
        Name =  $"Field Renamer{Id}";
    }

    private List<string> FieldsToRename { get; }
    private List<string> NewNames { get; }

    public override string GetQuery()
    {
        var selectList = CreateModifiedListForStringsInMap((x, y) => $"{x} AS {y}");

        return Pipeline.QueryBuilder.Select(selectList, PreviousComponents[0].GetQuery(),
            Pipeline.TableManager.NewTableName());
    }

    public override List<string> GetKeys()
    {
        return CreateModifiedListForStringsInMap((x, y) => y);
    }

    private Dictionary<string, string> GetNameMap()
    {
        var oldNewNameMap = new Dictionary<string, string>();

        for (var i = 0; i < NewNames.Count; i++) oldNewNameMap.Add(FieldsToRename[i], NewNames[i]);

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