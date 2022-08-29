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
        var tableName = Parameters["table_name"][0];
        var filePath = Parameters["file_path"][0];
        var keys = new StreamReader(filePath).ReadLine().Replace("\\s+", "").Split(",").ToList();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.Drop(tableName)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.CreateTable(tableName, keys)).Close();
        Pipeline.Database.Execute(Pipeline.QueryBuilder.ImportCSV(tableName, keys, filePath)).Close();
    }
}