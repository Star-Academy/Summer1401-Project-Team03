using System.Data.Common;
using server.Components;
using server.configurations;
using server.Databases;

namespace server.Pipelines;

public class Pipeline
{
    public HashSet<int> DestinationIDs;
    public Dictionary<int, Component> IdToComponent;

    public Pipeline(string name, DBConfiguration dbConfiguration)
    {
        Name = name;
        Database = new PostgresDatabase(dbConfiguration);
        QueryBuilder = new PostgresQueryBuilder();
        TableManager = new TableManager();
        IdToComponent = new Dictionary<int, Component>();
    }

    public string Name { get; set; }

    public IDatabase Database { set; get; }
    public IQueryBuilder QueryBuilder { set; get; }
    public TableManager TableManager { set; get; }

    public DbDataReader Execute(int id)
    {
        return Database.Execute(IdToComponent[id].GetQuery());
    }

    public void Execute()
    {
        foreach (var destination in DestinationIDs) Database.Execute(IdToComponent[destination].GetQuery());
    }

    public void AddComponent(Component component)
    {
        IdToComponent[component.Id] = component;
    }
}