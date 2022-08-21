using server.Databases;

namespace server.Components.Extractors;

public class JSONExtractor : Extractor
{
    public JSONExtractor(IDatabase database, string tableName, string filePath) :
        base(database, tableName, filePath)
    {
    }

    public override string GetQuery()
    {
        throw new NotImplementedException();
    }

    public override void Extract()
    {
        throw new NotImplementedException();
    }
}