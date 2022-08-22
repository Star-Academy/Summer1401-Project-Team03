using server.Components;
using server.Databases;

namespace server.Pipelines;

public class Pipeline
{
    public static IQueryBuilder QueryBuilder = new PostgresQueryBuilder();
    public IDatabase Database { set; get; }
    public Dictionary<int, Component> IdToComponent;

    public Pipeline(string host, string username, string database, string password)
    {
        Database = new PostgresDatabase(host, username, database, password);
        IdToComponent = new Dictionary<int, Component>();
    }

    public void AddComponent(Component component)
    {
        
    }
}