using server.Databases;

namespace server.Components.Extractors;

public abstract class Extractor : Component
{
    public Extractor(IDatabase database, string tableName, string filePath)
    {
        Database = database;
        TableName = tableName;
        FilePath = filePath;
    }

    public IDatabase Database { set; get; }
    public string TableName { set; get; }
    public string FilePath { set; get; }

    public abstract void Extract();
}