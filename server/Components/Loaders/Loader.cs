using server.Pipelines;

namespace server.Components.Loaders;

public abstract class Loader : Component
{
    public Loader(Pipeline pipeline, Component previousComponent, string filePath) : base(pipeline)
    {
        PreviousComponent = previousComponent;
        FilePath = filePath;
    }

    public Component PreviousComponent { set; get; }
    public string FilePath { set; get; }

    public override string GetTable()
    {
        return PreviousComponent.GetTable();
    }

    public override List<string> GetKeys()
    {
        return PreviousComponent.GetKeys();
    }

    public abstract void Load();
}