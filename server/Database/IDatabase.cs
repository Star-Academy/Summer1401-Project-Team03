namespace server.Database;

public interface IDatabase
{
    public string Join(string firstTable, string secondTable);
    public string CreateTable(string tableName, List<string> keys);
    /*TODO
    Select();
    Aggregate();
    ...
    */
}