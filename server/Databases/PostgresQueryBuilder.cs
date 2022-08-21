using System.Text;

namespace server.Databases;

public class PostgresQueryBuilder : IQueryBuilder
{
    private const string PrimaryKey = "__";
    
    public static PostgresQueryBuilder Instance = new PostgresQueryBuilder();

    public string CreateTable(string tableName, List<string> keys)
    {
        var query = new StringBuilder($"CREATE TABLE {tableName} ( {PrimaryKey} SERIAL PRIMARY KEY");
        foreach (var key in keys)
        {
            query.Append($", {key} varchar(40)");
        }

        query.Append(')');
        return query.ToString();
    }

    public string ImportCSV(string tableName, List<string> keys, string filePath)
    {
        var query = new StringBuilder($"COPY {tableName} ({keys[0]}");
        for (int i = 1; i < keys.Count; i++)
        {
            query.Append($", {keys[i]}");
        }

        query.Append($") FROM '{filePath}' CSV HEADER");
        return query.ToString();
    }

    public string ExportCSV(string query, string filePath)
    {
        return $"COPY ({query}) TO '{filePath}' CSV HEADER";
    }

    public string Drop(string tableName)
    {
        return $"DROP TABLE IF EXISTS {tableName}";
    }

    public string Join(string firstTable, string secondTable)
    {
        throw new NotImplementedException();
    }

    public string Insert(List<string> values)
    {
        throw new NotImplementedException();
    }
}