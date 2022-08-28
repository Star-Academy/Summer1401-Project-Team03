using server.Databases;

namespace server.Components.Loaders;

public abstract class Loader : Component
{
    public IDatabase Database;

    public override string GetQuery()
    {
        Load();
        return PreviousComponents[0].GetQuery();
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys();
    }

    public abstract void Load();
}