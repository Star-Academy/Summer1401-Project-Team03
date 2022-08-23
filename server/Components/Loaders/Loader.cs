using server.Pipelines;

namespace server.Components.Loaders;

public abstract class Loader : Component
{
    public Loader(Pipeline pipeline, Position position, string filePath) : base(pipeline, position)
    {
        FilePath = filePath;
        pipeline.DestinationIDs.Add(Id);
    }

    public string FilePath { set; get; }

    public override string GetTable()
    {
        return PreviousComponents[0].GetTable();
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys();
    }

    public abstract void Load();
}