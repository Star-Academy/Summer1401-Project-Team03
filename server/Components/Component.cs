using server.Pipelines;

namespace server.Components;

public abstract class Component
{
    private static int _counter;

    public Component(Pipeline pipeline)
    {
        Id = _counter;
        Pipeline = pipeline;
        _counter++;
    }

    public int Id { get; }

    public Pipeline Pipeline { set; get; }

    public abstract string GetQuery();

    public abstract string GetTable();
}