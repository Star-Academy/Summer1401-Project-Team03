using server.Pipelines;

namespace server.Components.Transformers;

public class FieldSelector : Transformer
{
    public FieldSelector() : base()
    {
        Type = $"field_selector";
    }

    public override string GetQuery()
    {
        return QueryBuilder.Select(Parameters["fields"], PreviousComponents[0].GetQuery(),
            QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        return Parameters["fields"];
    }
}