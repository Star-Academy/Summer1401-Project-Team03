using server.Databases;
using server.Pipelines;

namespace server.Components.Extractors;

public abstract class Extractor : Component
{
    public string TableName { set; get; }
    public string FilePath { set; get; }

    public Extractor(Pipeline pipeline, string filePath) : base(pipeline)
    {
        TableName = pipeline.TableManager.NewTableName();
        FilePath = filePath;
    }

    public override string GetTable()
    {
        return TableName;
    }

    public abstract void Extract();
}