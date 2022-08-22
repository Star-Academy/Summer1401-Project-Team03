using server.Components;
using server.Databases;

namespace server.Pipelines;

public class Pipeline
{
    public IDatabase Database { set; get; }
    public IQueryBuilder QueryBuilder { set; get; }
    public TableManager TableManager { set; get; }
    public Dictionary<int, Component> IdToComponent;

    public Pipeline(string host, string username, string database, string password)
    {
        Database = new PostgresDatabase(host, username, database, password);
        QueryBuilder = new PostgresQueryBuilder();
        TableManager = new TableManager();
        IdToComponent = new Dictionary<int, Component>();
    }

    public IDatabase Database { set; get; }

    public void AddComponent(Component component)
    {
    }
}