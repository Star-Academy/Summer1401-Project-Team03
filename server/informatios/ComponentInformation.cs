using server.Components;
using server.Enums;

namespace server.Information;

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
    }

    public string Title { get; set; }
    public int Id { get; set; }
    public string Type { get; set; }
    public List<int> NextIds { get; set; }
    public List<int> PreviousIds { get; set; }
    public Position Position { get; set; }
    public Dictionary<string, List<string>> Parameters { get; set; }
}