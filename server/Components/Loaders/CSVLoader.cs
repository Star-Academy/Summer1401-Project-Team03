using server.Databases;
using server.Pipelines;

namespace server.Components.Loaders;

public class CSVLoader : Loader
{
    public CSVLoader(IDatabase database, Component previousComponent, string filePath) :
        base(database, previousComponent, filePath)
    {
    }
    
    public override string GetQuery()
    {
        Load();
        return "worked";
    }
    
    public override void Load()
    {
        Database.Execute(Pipeline.QueryBuilder.ExportCSV(PreviousComponent.GetQuery(), FilePath)).Close();
    }
}