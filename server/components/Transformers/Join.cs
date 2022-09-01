using server.enums;
using server.file;
using SqlKata;

namespace server.components.Transformers;

public class Join : Transformer
{
    private const string FileId = "file_id";
    private const string JoinType = "join_type";
    private const string LFields = "l_fields";
    private const string RFields = "r_fields";
    private const string Operators = "operators";
    
    public Join()
    {
        Type = ComponentType.Join;
    }

    public override string GetQuery()
    {
        var lTable = PreviousComponents[0].GetQuery();
        var rTable = CreateTable();
        var lTableAlias = Pipeline.QueryBuilder.NewAlias();
        var rTableAlias = Pipeline.QueryBuilder.NewAlias();
        var lFields = Parameters[LFields];
        var rFields = Parameters[RFields];
        var operators = Parameters[Operators];
        var joinType = Parameters[JoinType][0];
        var lKeys = PreviousComponents[0].GetKeys();
        var rPath = FileSearcher.Search(int.Parse(Parameters[FileId][0]), "imports");
        
        var rKeys = new StreamReader(rPath).ReadLine().Replace("\\s+", "").Split(",").ToList();
        var fieldsToSelect = new List<string>();
        foreach (var key in lKeys)
        {
            fieldsToSelect.Add($"{lTableAlias}.{key} AS L_{key}");    
        }
        foreach (var key in rKeys)
        {
            fieldsToSelect.Add($"{rTableAlias}.{key} AS R_{key}");    
        }

        return Pipeline.QueryBuilder.Select(fieldsToSelect,
            Pipeline.QueryBuilder.Join(lTable, rTable, lTableAlias, rTableAlias, lFields, rFields, operators, joinType));
    }

    public string CreateTable()
    {
        var rTable = Pipeline.QueryBuilder.NewAlias();
        var filePath = FileSearcher.Search(int.Parse(Parameters[FileId][0]), "imports");
        var keys = new StreamReader(filePath).ReadLine().Replace("\\s+", "").Split(",").ToList();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.Drop(rTable)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.CreateTable(rTable, keys)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.ImportCSV(rTable, keys, filePath)).Close();
        return Pipeline.QueryBuilder.SelectTable(rTable);
    }

    public override List<string> GetKeys()
    {
        var lKeys = PreviousComponents[0].GetKeys();
        var rPath = FileSearcher.Search(int.Parse(Parameters[FileId][0]), "imports");
        
        var rKeys = new StreamReader(rPath).ReadLine().Replace("\\s+", "").Split(",").ToList();

        lKeys.AddRange(rKeys);
        return lKeys;
    }
}