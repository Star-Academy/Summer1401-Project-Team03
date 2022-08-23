using server.Pipelines;

namespace server.Components.Extractors;

public class JSONExtractor : Extractor
{
    public JSONExtractor(Pipeline pipeline, Position position, string filePath) :
        base(pipeline, position, filePath)
    {
    }

    public override string GetQuery()
    {
        throw new NotImplementedException();
    }

    public override List<string> GetKeys()
    {
        throw new NotImplementedException();
    }

    public override void Extract()
    {
        throw new NotImplementedException();
    }
}