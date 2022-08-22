using server.Databases;
using server.Pipelines;

namespace server.Components.Loaders;

public class CSVLoader : Loader
{
    public CSVLoader(Pipeline pipeline, Component previousComponent, string filePath) :
        base(pipeline, previousComponent, filePath)
    {
    }

    public override string GetQuery()
    {
        Load();
        return PreviousComponent.GetQuery();
    }

    public override void Load()
    {
        Pipeline.Database.Execute(Pipeline.QueryBuilder.ExportCSV(PreviousComponent.GetQuery(), FilePath)).Close();
    }
}