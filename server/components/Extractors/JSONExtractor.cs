using server.Enums;

namespace server.Components.Extractors;

public class JSONExtractor : Extractor
{
    public JSONExtractor()
    {
        Type = ComponentType.JSONExtractor;
    }

    public override List<string> GetKeys()
    {
        throw new NotImplementedException();
    }

    public override void Extract()
    {
        var filePath = Parameters["file_path"][0];
        var keys = GetKeys();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.Drop(_tableName)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.CreateTable(_tableName, keys)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.ImportJson(_tableName, keys, filePath)).Close();
    }
}