using server.Enums;

namespace server.Components.Extractors;

public class CSVExtractor : Extractor
{
    public CSVExtractor()
    {
        Type = ComponentType.CSVExtractor;
    }

    public override List<string> GetKeys()
    {
        return new StreamReader(Parameters["file_path"][0]).ReadLine().Replace("\\s+", "").Split(",").ToList();
    }

    public override void Extract()
    {
        var filePath = Parameters["file_path"][0];
        var keys = new StreamReader(filePath).ReadLine().Replace("\\s+", "").Split(",").ToList();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.Drop(_tableName)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.CreateTable(_tableName, keys)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.ImportCSV(_tableName, keys, filePath)).Close();
    }
}