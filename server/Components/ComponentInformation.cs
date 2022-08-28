namespace server.Components;

public class ComponentInformation
{
    public string Type { get; set; }
    public int Id { get; set; }
    public List<int> NextIds { get; set; }
    public List<int> PreviousIds { get; set; }
    public Position Position { get; set; }
    public Dictionary<string, string> TransformData { get; set; }

    public ComponentInformation()
    {
        
    }
    public ComponentInformation(string type, int id, List<int> nextIds, List<int> previousIds, Position position, Dictionary<string, string> transformData)
    {
        Type = type;
        Id = id;
        NextIds = nextIds;
        PreviousIds = previousIds;
        Position = position;
        TransformData = transformData;
    }

    public ComponentInformation(Component component)
    {
        Type = component.Name;
        Id = component.Id;
        NextIds = component.NextComponents.Select(x => x.Id).ToList();
        PreviousIds = component.PreviousComponents.Select(x => x.Id).ToList();
        Position = component.Position;
        TransformData = component.TransformData;
    }
}