using server.enums;

namespace server.components.Loaders;

public class CSVLoader : Loader
{
    public CSVLoader()
    {
        Type = ComponentType.CsvLoader;
    }

    public override void Load()
    {
        Pipeline.Database
            .Execute(Pipeline.QueryBuilder.ExportCSV(PreviousComponents[0].GetQuery(), Parameters[FilePath][0]))
            .Close();
    }
}