using System.Text;
using server.Enums;

namespace server.Databases;

public class PostgresQueryBuilder : IQueryBuilder
{
    private const string PrimaryKey = "__";

    public string CreateTable(string table, List<string> keys)
    {
        var query = new StringBuilder($"CREATE TABLE {table} ( {PrimaryKey} SERIAL PRIMARY KEY");
        foreach (var key in keys) query.Append($", {key} varchar(40)");

        query.Append(')');
        return query.ToString();
    }

    public string Copy(string tableToCopy, string newTableName)
    {
        return $"CREATE TABLE {tableToCopy} AS TABLE {newTableName}";
    }


    public string Drop(string table)
    {
        return $"DROP TABLE IF EXISTS {table}";
    }

    public string ImportCSV(string table, List<string> keys, string filePath)
    {
        var query = new StringBuilder($"COPY {table} ({keys[0]}");
        for (var i = 1; i < keys.Count; i++) query.Append($", {keys[i]}");

        query.Append($") FROM '{filePath}' CSV HEADER");
        return query.ToString();
    }

    public string ExportCSV(string table, string filePath)
    {
        return $"COPY ({table}) TO '{filePath}' CSV HEADER";
    }

    public string Select(List<string> keys, string table)
    {
        var query = new StringBuilder($"SELECT {keys[0]}");
        for (var i = 1; i < keys.Count; i++) query.Append($", {keys[i]}");

        query.Append($" FROM ({table})");
        return query.ToString();
    }

    public string Select(List<string> keys, string table, string alias)
    {
        var query = new StringBuilder($"SELECT {keys[0]}");
        for (var i = 1; i < keys.Count; i++) query.Append($", {keys[i]}");

        query.Append($" FROM ({table}) AS {alias}");
        return query.ToString();
    }

    public string Where(string condition)
    {
        return $"WHERE {condition}";
    }

    public string Where(string key, Operator @operator, object value)
    {
        var valueString = value.ToString();
        if (value is string) valueString = $"'{valueString}'";

        var condition = $"{key} {@operator.GetString()} {valueString}";
        return Where(condition);
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