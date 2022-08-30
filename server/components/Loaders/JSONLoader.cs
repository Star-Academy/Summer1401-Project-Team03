using server.Enums;

namespace server.Components.Loaders;

public class JSONLoader : Loader
{
    public JSONLoader()
    {
        Type = ComponentType.JSONLoader;
    }

    public override void Load()
    {
        Pipeline.Database
            .Execute(Pipeline.QueryBuilder.ExportJson(PreviousComponents[0].GetQuery(), Parameters[FilePath][0]))
            .Close();
    }
}