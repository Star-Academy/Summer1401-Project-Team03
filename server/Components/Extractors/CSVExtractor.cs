using server.Pipelines;

namespace server.Components.Extractors;

public class CSVExtractor : Extractor
{
    public CSVExtractor(Pipeline pipeline, Position position, string filePath) :
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
        return new StreamReader(FilePath).ReadLine().Replace("\\s+", "").Split(",").ToList();
    }

    public override void Extract()
    {
        var keys = new StreamReader(FilePath).ReadLine().Replace("\\s+", "").Split(",").ToList();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.Drop(TableName)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.CreateTable(TableName, keys)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.ImportCSV(TableName, keys, FilePath)).Close();
    }
}