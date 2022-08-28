using server.Databases;
using server.Enums;

namespace server.Components;

public abstract class Component
{
    public Component()
    {
        NextComponents = new List<Component>();
        PreviousComponents = new List<Component>();
        Parameters = new Dictionary<string, List<string>>();
    }

    public Component(ComponentInformation information, IQueryBuilder queryBuilder)
    {
        Id = information.Id;
        Position = information.Position;
        Type = information.Type;
        Parameters = information.Parameters;
        QueryBuilder = queryBuilder;
    }
    
    public void AddNextComponent(Component component)
    {
        NextComponents.Add(component);
    }

    public void RemoveNextComponent(Component component)
    {
        if (NextComponents.Remove(component))
        {
            return;
        }

        throw new Exception("next component does not exist!");
    }

    public void AddPreviousComponent(Component component)
    {
        PreviousComponents.Add(component);
    }
    
    public void RemovePreviousComponent(Component component)
    {
        if (PreviousComponents.Remove(component))
        {
            return;
        }

        throw new Exception("previous component does not exist!");
    }

    public Dictionary<string, List<string>> Parameters { set; get; }
    public List<Component> NextComponents { set; get; }

    public List<Component> PreviousComponents { set; get; }
    public Position Position { set; get; }

    public ComponentType Type { set; get; }

    public int Id { set; get; }
    public IQueryBuilder QueryBuilder { set; get; }

    public abstract string GetQuery();
    public abstract List<string> GetKeys();
}