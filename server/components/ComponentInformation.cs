﻿namespace server.Components;

public class ComponentInformation
{
    public int Id { get; set; }
    public string Type { get; set; }
    public List<int> NextIds { get; set; }
    public List<int> PreviousIds { get; set; }
    public Position Position { get; set; }
    public Dictionary<string, List<string>> Parameters { get; set; }

    public ComponentInformation()
    {
        
    }
    public ComponentInformation(string type, int id, List<int> nextIds, List<int> previousIds, Position position, Dictionary<string, List<string>> parameters)
    {
        Type = type;
        Id = id;
        NextIds = nextIds;
        PreviousIds = previousIds;
        Position = position;
        Parameters = parameters;
    }

    public ComponentInformation(Component component)
    {
        Type = component.Type;
        Id = component.Id;
        NextIds = component.NextComponents.Select(x => x.Id).ToList();
        PreviousIds = component.PreviousComponents.Select(x => x.Id).ToList();
        Position = component.Position;
        Parameters = component.Parameters;
    }
}