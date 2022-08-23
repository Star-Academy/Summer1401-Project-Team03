using server.Pipelines;

namespace server.Components.Extractors;

public abstract class Extractor : Component
{
    public Extractor(Pipeline pipeline, Position position, string filePath) : base(pipeline, position)
    {
        TableName = pipeline.TableManager.NewTableName();
        FilePath = filePath;
    }

    public string TableName { set; get; }
    public string FilePath { set; get; }

    public override string GetTable()
    {
        return TableName;
    }

    public abstract void Extract();
}