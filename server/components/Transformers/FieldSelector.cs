using server.Enums;

namespace server.Components.Transformers;

public class FieldSelector : Transformer
{
    public FieldSelector()
    {
        Type = ComponentType.FieldSelector;
    }

    public override string GetQuery()
    {
        return Pipeline.QueryBuilder.Select(Parameters["fields"], PreviousComponents[0].GetQuery(),
            Pipeline.QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        return Parameters["fields"];
    }
}