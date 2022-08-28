using server.Components.Transformers;
using server.Databases;
using server.Pipelines;

namespace server.Components;

public abstract class Component
{
    public Component()
    {
        NextComponents = new List<Component>();
        PreviousComponents = new List<Component>();
    }

    public Component(ComponentInformation information, IQueryBuilder queryBuilder)
    {
        Id = information.Id;
        Position = information.Position;
        Type = information.Type;
        Parameters = information.Parameters;
        QueryBuilder = queryBuilder;
    }

    public Dictionary<string, List<string>> Parameters { set; get; }
    public List<Component> NextComponents { set; get; }

    public List<Component> PreviousComponents { set; get; }
    public Position Position { set; get; }

    public string Type { set; get; }

    public int Id { set; get; }
    public IQueryBuilder QueryBuilder { set; get; }

    public abstract string GetQuery();
    public abstract List<string> GetKeys();
}