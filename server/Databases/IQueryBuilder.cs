namespace server.Databases;

public interface IQueryBuilder
{
    public string CreateTable(string table, List<string> keys);

    public string ImportCSV(string tableName, List<string> keys, string filePath);

    public string ExportCSV(string query, string filePath);

    public string Drop(string tableName);
}