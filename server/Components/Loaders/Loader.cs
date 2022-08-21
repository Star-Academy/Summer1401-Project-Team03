using server.Databases;

namespace server.Components.Loaders;

public abstract class Loader : Component
{
    public IDatabase Database { set; get; }
    public Component PreviousComponent { set; get; }
    public string FilePath { set; get; }

    public Loader(IDatabase database, Component previousComponent, string filePath) : base()
    {
        Database = database;
        PreviousComponent = previousComponent;
        FilePath = filePath;
    }

    public abstract void Load();
}