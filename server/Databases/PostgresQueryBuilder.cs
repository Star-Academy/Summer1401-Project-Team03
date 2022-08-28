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

    public string Where(string key, string @operator, object value)
    {
        var valueString = value.ToString();
        if (value is string) valueString = $"'{valueString}'";

        var condition = $"{key} {@operator} {valueString}";
        return Where(condition);
    }

    public string Where(List<string> keys, List<string> operators, List<object> values)
    {
        var query = new StringBuilder(Where("true"));
        for (var i = 0; i < keys.Count; i++)
        {
            var valueString = values[i].ToString();
            if (values[i] is string) valueString = $"'{valueString}'";
            query.Append($"AND {keys[i]} {operators[0]} {valueString}");
        }

        return query.ToString();
    }

    public string Where(List<string> keys, List<Operator> operators, List<object> values)
    {
        var query = new StringBuilder(Where("true"));
        for (var i = 0; i < keys.Count; i++)
        {
            var valueString = values[i].ToString();
            if (values[i] is string) valueString = $"'{valueString}'";
            query.Append($"AND {keys[i]} {operators[0].GetString()} {valueString}");
        }

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
        for (var i = 0; i < keys.Count; i++)
        {
            query.Append($", {keys[i]}");
        }

        return query.ToString();
    }

    public string Aggregate(string key, string function)
    {
        if (function.ToLower() == "list")
        {
            function = "array_agg";
        }
        return $"{function}({key})";
    }

    public string Sample(string table, string alias, int number)
    {
        return $"SELECT * FROM ({table}) AS {alias} ORDER BY random() LIMIT {number}";
    }

    public string AlterType(string key, string type)
    {
        return $"ALTER COLUMN {key} TYPE {type} USING ({key}::{type})";
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