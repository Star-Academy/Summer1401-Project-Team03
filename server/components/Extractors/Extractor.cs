namespace server.Components.Extractors;

public abstract class Extractor : Component
{
    protected const string FilePath = "file_path";
    protected string _tableName;

    public override string GetQuery()
    {
        if (_tableName is null)
        {
            _tableName = Pipeline.QueryBuilder.NewAlias();
        }
        if (!isConfigSet)
            throw new System.Configuration.ConfigurationException($"Configuration not set!component Title: {Title}, component type: {Type}, id: {Id}");

        Extract();
        return Pipeline.QueryBuilder.SelectTable(_tableName);
    }

    public abstract void Extract();
}