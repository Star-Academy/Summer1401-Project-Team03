namespace server.Databases;

public interface IQueryBuilder
{
    public string CreateTable(string table, List<string> keys);

    public string Copy(string newTableName, string table);

    public string ImportCSV(string table, List<string> keys, string filePath);

    public string ExportCSV(string table, string filePath);

    public string ImportJson(string table, List<string> keys, string filePath);

    public string ExportJson(string table, string filePath);
    public string Drop(string table);

    public string Select(List<string> keys, string table);

    public string Select(List<string> keys, string table, string alias);

    public string SelectTable(string tableName);

    public string Where(string condition);

    public string Where(string key, string @operator, string value);

    public string Where(List<string> keys, List<string> operators, List<string> values);

    public string ConvertType(string key, string type);

    public string GroupBy(string key);

    public string GroupBy(List<string> keys);

    public string Aggregate(string key, string function);

    public string Sample(string table, string alias, int number);

    public string Function(string function, string key);

    public string Alias(string key, string alias);

    public string NewAlias();
}