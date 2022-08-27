using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using DBConfig;
using server.Components;
using server.configurations;
using server.Databases;

namespace server.Pipelines;

public class Pipeline
{
    public HashSet<int> DestinationIDs;
    public Dictionary<int, Component> IdToComponent;

    public Pipeline(PipelineInformation information)
    {
        var dbConfiguration = DBConfigLoader.Load();
        Name = information.Name;
        id = information.ID;
        DestinationIDs = information.DestinationIDs;
        IdToComponent = information.IdToComponent.ToDictionary(t => t.Key,
            t => ComponentInformationAdaptor.getComponentFromInformation(t.Value));
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
    public int id { get; set; }
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
}