using server.Databases;

namespace server.Components.Loaders;

public class JSONLoader : Loader
{
    public JSONLoader(IDatabase database, Component previousComponent, string filePath) :
        base(database, previousComponent, filePath)
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