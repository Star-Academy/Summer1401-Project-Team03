namespace server.Components.Extractors;

public abstract class Extractor : Component
{
    protected const string FilePath = "file_path";
    protected string _tableName;

    public override string GetQuery()
    {
        _tableName = Pipeline.QueryBuilder.NewAlias();
        Extract();
        return Pipeline.QueryBuilder.SelectTable(_tableName);
    }

    public abstract void Extract();
}