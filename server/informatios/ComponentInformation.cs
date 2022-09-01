using server.components;
using server.enums;

namespace server.informatios;

public class ComponentInformation
{
    public ComponentInformation()
    {
    }

    public ComponentInformation(Component component)
    {
        Title = component.Title;
        Type = component.Type.GetString();
        Id = component.Id;
        NextIds = component.NextComponents.Select(x => x.Id).ToList();
        PreviousIds = component.PreviousComponents.Select(x => x.Id).ToList();
        Position = component.Position;
        Parameters = component.Parameters;
        IsConfigSet = component.IsConfigSet;
    }

    public string Title { get; set; }
    
    public bool IsConfigSet { get; set; }
    public int Id { get; set; }
    public string Type { get; set; }
    public List<int> NextIds { get; set; }
    public List<int> PreviousIds { get; set; }
    public Position Position { get; set; }
    public Dictionary<string, List<string>> Parameters { get; set; }
}