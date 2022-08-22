using server.Databases;

namespace server.Components.Loaders;

public abstract class Loader : Component
{
    public Loader(IDatabase database, Component previousComponent, string filePath)
    {
        Database = database;
        PreviousComponent = previousComponent;
        FilePath = filePath;
    }

    public IDatabase Database { set; get; }
    public Component PreviousComponent { set; get; }
    public string FilePath { set; get; }

    public abstract void Load();
}