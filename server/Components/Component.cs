using server.Pipelines;

namespace server.Components;

public abstract class Component
{
    private static int _counter;

    public Component(Pipeline pipeline, Position position)
    {
        Id = _counter;
        Pipeline = pipeline;
        PreviousComponents = new List<Component>();
        NextComponents = new List<Component>();
        Position = position;
        _counter++;
    }

    public List<Component> NextComponents { set; get; }

    public Position Position { set; get; }

    public List<Component> PreviousComponents { set; get; }

    public int Id { get; }
    public Pipeline Pipeline { set; get; }

    public abstract string GetQuery();

    public abstract string GetTable();

    public abstract List<string> GetKeys();

    public abstract void ConnectToAdjacentComponents(int previousId, int nextId);
}