using server.Databases;

namespace server.Components.Extractors;

public abstract class Extractor : Component
{
    public IDatabase Database;


    public override string GetQuery()
    {
        Extract();
        return QueryBuilder.SelectTable(Parameters["table_name"][0]);
    }

    public abstract void Extract();
}