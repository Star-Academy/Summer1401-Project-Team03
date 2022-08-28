using server.Enums;
using server.Pipelines;

namespace server.Components.Transformers;

public class Filter : Transformer
{
    public Filter() : base()
    {
        Type = "filter";
    }

    public override string GetQuery()
    {
        return
            $"{QueryBuilder.Select(new List<string> {"*"}, PreviousComponents[0].GetQuery(), QueryBuilder.NewAlias())} {QueryBuilder.Where(Parameters["fields_to_filter"], Parameters["operators"], Parameters["values"])}";
    }
}