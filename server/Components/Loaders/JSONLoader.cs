using server.Pipelines;

namespace server.Components.Loaders;

public class JSONLoader : Loader
{
    public JSONLoader(Pipeline pipeline, Position position, string filePath) :
        base(pipeline, position, filePath)
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