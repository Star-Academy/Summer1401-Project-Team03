using System.Data.Common;
using DBConfig;
using server.Components;
using server.Databases;
using server.Information;

namespace server.Pipelines;

public class Pipeline
{
    public HashSet<int> DestinationIDs;
    public Dictionary<int, Component> IdToComponent;

    public Pipeline(PipelineInformation information)
    {
        var dbConfiguration = DBConfigLoader.Load();
        Name = information.Name;
        Id = information.Id;
        DestinationIDs = information.DestinationIDs;
        IdToComponent = information.ComponentInformations.ToDictionary(t => t.Id,
            t => ComponentFactory.Instance.LoadComponent(t, this));

        foreach (var info in information.ComponentInformations)
        foreach (var valuePreviousId in info.PreviousIds)
            Connect(valuePreviousId, info.Id);

        Database = new PostgresDatabase(dbConfiguration);
        QueryBuilder = new PostgresQueryBuilder();
        TableManager = new TableManager();
    }

    public Pipeline(string name)
    {
        var dbConfiguration = DBConfigLoader.Load();
        Name = name;
        Database = new PostgresDatabase(dbConfiguration);
        QueryBuilder = new PostgresQueryBuilder();
        TableManager = new TableManager();
        IdToComponent = new Dictionary<int, Component>();
        DestinationIDs = new HashSet<int>();
    }

    public string Name { get; set; }
    public int Id { get; set; }
    public IDatabase Database { set; get; }
    public IQueryBuilder QueryBuilder { set; get; }
    public TableManager TableManager { set; get; }

    public DbDataReader Execute(int id)
    {
        return Database.Execute(IdToComponent[id].GetQuery());
    }

    public void Execute()
    {
        foreach (var destination in DestinationIDs) Database.Execute(IdToComponent[destination].GetQuery()).Close();
    }

    public void AddComponent(Component component)
    {
        IdToComponent[component.Id] = component;
    }

    public void AddDestinationId(int id)
    {
        DestinationIDs.Add(id);
    }

    public void Connect(int previousId, int nextId)
    {
        var previousComponent = IdToComponent[previousId];
        var nextComponent = IdToComponent[nextId];
        previousComponent.AddNextComponent(nextComponent);
        nextComponent.AddPreviousComponent(previousComponent);
    }

    public void Disconnect(int previousId, int nextId)
    {
        var previousComponent = IdToComponent[previousId];
        var nextComponent = IdToComponent[nextId];
        previousComponent.RemoveNextComponent(nextComponent);
        nextComponent.RemovePreviousComponent(previousComponent);
    }
}