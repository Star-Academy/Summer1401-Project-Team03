using server.Pipelines;

namespace server.Components;

public abstract class Component
{

    public Component(Pipeline pipeline, Position position)
    {
        Id = pipeline.IdToComponent.Count + 1;
        Pipeline = pipeline;
        PreviousComponents = new List<Component>();
        NextComponents = new List<Component>();
        Position = position;
    }

    public Component(ComponentInformation information, Pipeline pipeline)
    {
        Id = information.Id;
        Pipeline = pipeline;
        Position = information.Position;
        Name = information.Type;
        TransformData = information.TransformData;
    }

    public void SetPreviousNextComponents(ComponentInformation information)
    {
        PreviousComponents = information.PreviousIds.Select(id => Pipeline.IdToComponent[id]).ToList();
        NextComponents = information.NextIds.Select(id => Pipeline.IdToComponent[id]).ToList();

    }

    
    public Dictionary<string, string> TransformData { set; get; }
    public List<Component> NextComponents { set; get; }

    public Position Position { set; get; }
    
    public string Name { set; get; }

    public List<Component> PreviousComponents { set; get; }

    public int Id { get; }
    public Pipeline Pipeline { set; get; }

    public abstract string GetQuery();

    public abstract string GetTable();

    public abstract List<string> GetKeys();

    public abstract void ConnectToAdjacentComponents(int previousId, int nextId);
}