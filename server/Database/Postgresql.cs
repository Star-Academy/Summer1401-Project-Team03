using server.Database;

namespace DefaultNamespace;

public class Postgresql : IDatabase
{
    public void Execute(string query)
    {
        throw new NotImplementedException();
    }

    public string Join(string firstTable, string secondTable)
    {
        throw new NotImplementedException();
    }

    public string CreateTable(string tableName, List<string> keys)
    {
        throw new NotImplementedException();
    }
}