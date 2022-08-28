using Newtonsoft.Json.Linq;
using server.Pipelines;

namespace server.Components.Extractors;

public class JSONExtractor : Extractor
{
    public JSONExtractor(Pipeline pipeline, Position position, string filePath) :
        base(pipeline, position, filePath)
    {
    }

    public override string GetQuery()
    {
        Extract();
        return Pipeline.QueryBuilder.SelectTable(TableName);
    }

    public override List<string> GetKeys()
    {
        throw new NotImplementedException();
    }

    public override void Extract()
    {
        var keys = GetKeys();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.Drop(TableName)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.CreateTable(TableName, keys)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.ImportJson(TableName, keys, FilePath)).Close();
    }
}