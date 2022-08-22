using server.Databases;
using server.Pipelines;

namespace server.Components.Loaders;

public abstract class Loader : Component
{
    public Component PreviousComponent { set; get; }
    public string FilePath { set; get; }

    public Loader(Pipeline pipeline, Component previousComponent, string filePath) : base(pipeline)
    {
        PreviousComponent = previousComponent;
        FilePath = filePath;
    }

    public override string GetTable()
    {
        return PreviousComponent.GetTable();
    }

    public abstract void Load();
}