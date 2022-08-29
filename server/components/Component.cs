using server.Enums;
using server.Pipelines;

namespace server.Components;

public abstract class Component
{
    public Component()
    {
        NextComponents = new List<Component>();
        PreviousComponents = new List<Component>();
        Parameters = new Dictionary<string, List<string>>();
    }

    public Component(ComponentInformation information, Pipeline pipeline)
    {
        Id = information.Id;
        Position = information.Position;
        Type = information.Type.GetComponentType();
        Parameters = information.Parameters;
        Pipeline = pipeline;
    }

    public Dictionary<string, List<string>> Parameters { set; get; }
    public List<Component> NextComponents { set; get; }

    public List<Component> PreviousComponents { set; get; }
    public Position Position { set; get; }

    public ComponentType Type { set; get; }

    public int Id { set; get; }
    public Pipeline Pipeline { set; get; }

    public void AddNextComponent(Component component)
    {
        NextComponents.Add(component);
    }

    public void RemoveNextComponent(Component component)
    {
        if (NextComponents.Remove(component)) return;

        throw new Exception("next component does not exist!");
    }

    public void AddPreviousComponent(Component component)
    {
        PreviousComponents.Add(component);
    }

    public void RemovePreviousComponent(Component component)
    {
        if (PreviousComponents.Remove(component)) return;

        throw new Exception("previous component does not exist!");
    }

    public abstract string GetQuery();
    public abstract List<string> GetKeys();
}