using server.Pipelines;

namespace server.Components.Loaders;

public class CSVLoader : Loader
{
    public CSVLoader(Pipeline pipeline, Position position, string filePath) :
        base(pipeline, position, filePath)
    {
    }

    public override string GetQuery()
    {
        Load();
        return PreviousComponents[0].GetQuery();
    }

    public override void Load()
    {
        Pipeline.Database.Execute(Pipeline.QueryBuilder.ExportCSV(PreviousComponents[0].GetQuery(), FilePath)).Close();
    }
}