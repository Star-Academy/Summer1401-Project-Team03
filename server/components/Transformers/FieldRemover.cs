using server.Pipelines;

namespace server.Components.Transformers;

public class FieldRemover : Transformer
{
    public FieldRemover(Pipeline pipeline, Position position) : base()
    {
        Type = $"field_remover";
    }

    public override string GetQuery()
    {
        return QueryBuilder.Select(GetKeys(), PreviousComponents[0].GetQuery(), QueryBuilder.NewAlias());
    }

    public override List<string> GetKeys()
    {
        return PreviousComponents[0].GetKeys().Except(Parameters["fields"]).ToList();
    }
}