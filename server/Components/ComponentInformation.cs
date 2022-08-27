namespace server.Components;

public class ComponentInformation
{
    public string Type;
    public int Id;
    public List<int> NextIds;
    public List<int> PreviousIds;
    public Position Position;
    public Dictionary<string, string> TransformData;

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