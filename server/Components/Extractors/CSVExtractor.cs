using server.Databases;
using server.Pipelines;

namespace server.Components.Extractors;

public class CSVExtractor : Extractor
{
    public CSVExtractor(IDatabase database, string tableName, string filePath) :
        base(database, tableName, filePath)
    {
    }

    public override string GetQuery()
    {
        Extract();
        return $"SELECT * FROM {TableName}";
    }

    public override void Extract()
    {
        var Keys = new StreamReader(FilePath).ReadLine().Replace("\\s+", "").Split(",").ToList();
        Database.Execute(Pipeline.QueryBuilder.Drop(TableName)).Close();
        Database.Execute(Pipeline.QueryBuilder.CreateTable(TableName, Keys)).Close();
        Database.Execute(Pipeline.QueryBuilder.ImportCSV(TableName, Keys, FilePath)).Close();
    }
}