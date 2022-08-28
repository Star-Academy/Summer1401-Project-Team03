using server.Pipelines;

namespace server.Components.Loaders;

public class CSVLoader : Loader
{
    public CSVLoader() : base()
    {
        Type = "csv_loader";
    }

    public override void Load()
    {
        Database.Execute(QueryBuilder.ExportCSV(PreviousComponents[0].GetQuery(), Parameters["file_path"][0])).Close();
    }
}