using server.Pipelines;

namespace server.Components.Extractors;

public class CSVExtractor : Extractor
{
    public CSVExtractor() : base()
    {
        Type = "csv_extractor";
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
        Database.Execute(QueryBuilder.Drop(tableName)).Close();
        Database.Execute(QueryBuilder.CreateTable(tableName, keys)).Close();
        Database.Execute(QueryBuilder.ImportCSV(tableName, keys, filePath)).Close();
    }
}