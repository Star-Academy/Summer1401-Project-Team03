using System.Text;
using server.Enums;

namespace server.Databases;

public class PostgresQueryBuilder : IQueryBuilder
{
    private const string PrimaryKey = "__";
    private static int _counter;

    public string CreateTable(string table, List<string> keys)
    {
        var query = new StringBuilder($"CREATE TABLE {table} ( {PrimaryKey} SERIAL PRIMARY KEY");
        foreach (var key in keys) query.Append($", {key} {DataType.Text.ToString()}");

        query.Append(')');
        return query.ToString();
    }

    public string Copy(string newTableName, string table)
    {
        return $"CREATE TABLE {newTableName} AS ({table})";
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

    public string ImportJson(string table, List<string> keys, string filePath)
    {
        throw new NotImplementedException();
    }

    public string ExportJson(string table, string filePath)
    {
        return $"COPY (SELECT row_to_json({table}) from {table} ) TO '{filePath}'";
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

    public string SelectTable(string tableName)
    {
        return $"TABLE {tableName}";
    }

    public string Where(string condition)
    {
        return $"WHERE {condition}";
    }

    public string Where(string key, string @operator, string value)
    {
        var condition = $"{key} {@operator} {value}";
        return Where(condition);
    }

    public string Where(List<string> keys, List<string> operators, List<string> values)
    {
        var query = new StringBuilder(Where("true"));
        for (var i = 0; i < keys.Count; i++) query.Append($"AND {keys[i]} {operators[0]} {values[i]}");

        return query.ToString();
    }

    public string ConvertType(string key, string type)
    {
        return $"{key}::{type}";
    }

    public string GroupBy(string key)
    {
        return $"GROUP BY {key}";
    }

    public string GroupBy(List<string> keys)
    {
        var query = new StringBuilder(GroupBy(keys[0]));
        for (var i = 1; i < keys.Count; i++) query.Append($", {keys[i]}");

        return query.ToString();
    }

    public string Aggregate(string key, string function)
    {
        if (function.ToLower() == "list") function = "array_agg";

        return $"{function}({key})";
    }

    public string Sample(string table, string alias, int number)
    {
        return $"SELECT * FROM ({table}) AS {alias} ORDER BY random() LIMIT {number}";
    }

    public string NewAlias()
    {
        _counter++;
        return $"T{_counter}";
    }
}