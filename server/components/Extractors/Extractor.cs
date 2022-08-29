using server.Databases;

namespace server.Components.Extractors;

public abstract class Extractor : Component
{
    public override string GetQuery()
    {
        Extract();
        return Pipeline.QueryBuilder.SelectTable(Parameters["table_name"][0]);
    }

    public abstract void Extract();
}