namespace server.components.Loaders;

public abstract class Loader : Component
{
    protected const string FilePath = "file_path";

    public override string GetQuery()
    {
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        Load();
        return PreviousComponents[0].GetQuery();
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys();
    }

    public abstract void Load();
}