﻿using server.Enums;

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

    public string Where(string key, string @operator, object value);
}