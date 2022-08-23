using server.Pipelines;

namespace server.Components.Loaders;

public class JSONLoader : Loader
{
    public JSONLoader(Pipeline pipeline, Component previousComponent, string filePath) :
        base(pipeline, previousComponent, filePath)
    {
    }

    public override string GetQuery()
    {
        throw new NotImplementedException();
    }

    public override void Load()
    {
        throw new NotImplementedException();
    }
}