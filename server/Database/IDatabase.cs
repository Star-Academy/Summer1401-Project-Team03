namespace server.Database;

public interface IDatabase
{
    public void Execute(string query);
    public string Join(string firstTable, string secondTable);
    public string CreateTable(string tableName, List<string> keys);
    /*TODO
    Select();
    Aggregate();
    ...
    */
}