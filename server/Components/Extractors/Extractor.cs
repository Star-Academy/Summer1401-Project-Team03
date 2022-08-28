using server.Databases;
using server.Pipelines;

namespace server.Components.Extractors;

public abstract class Extractor : Component
{
    public IDatabase Database;

    public Extractor() : base()
    {
    }
    
    
    public override string GetQuery()
    {
        Extract();
        return QueryBuilder.SelectTable(Parameters["table_name"][0]);
    }

    public abstract void Extract();
}