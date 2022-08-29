using server.Enums;

namespace server.Components.Loaders;

public class CSVLoader : Loader
{
    public CSVLoader()
    {
        Type = ComponentType.CSVLoader;
    }

    public override void Load()
    {
        Pipeline.Database.Execute(Pipeline.QueryBuilder.ExportCSV(PreviousComponents[0].GetQuery(), Parameters["file_path"][0])).Close();
    }
}