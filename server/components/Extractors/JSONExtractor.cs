using Newtonsoft.Json.Linq;
using server.Pipelines;

namespace server.Components.Extractors;

public class JSONExtractor : Extractor
{
    public JSONExtractor() : base()
    {
        Type = "json_extractor";
    }

    public override List<string> GetKeys()
    {
        throw new NotImplementedException();
    }

    public override void Extract()
    {
        var tableName = Parameters["table_name"][0];
        var filePath = Parameters["file_path"][0];
        var keys = GetKeys();
        Database.Execute(QueryBuilder.Drop(tableName)).Close();
        Database.Execute(QueryBuilder.CreateTable(tableName, keys)).Close();
        Database.Execute(QueryBuilder.ImportJson(tableName, keys, filePath)).Close();
    }
}