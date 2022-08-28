using server.Pipelines;

namespace server.Components.Loaders;

public class JSONLoader : Loader
{
    public JSONLoader() : base()
    {
        Type = "json_loader";
    }

    public override void Load()
    {
        Database.Execute(QueryBuilder.ExportJson(PreviousComponents[0].GetQuery(), Parameters["file_path"][0])).Close();
    }
}