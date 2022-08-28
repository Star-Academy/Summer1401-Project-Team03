using server.Enums;

namespace server.Components.Transformers;

public class Filter : Transformer
{
    public Filter()
    {
        Type = ComponentType.Filter;
    }

    public override string GetQuery()
    {
        return
            $"{QueryBuilder.Select(new List<string> { "*" }, PreviousComponents[0].GetQuery(), QueryBuilder.NewAlias())} {QueryBuilder.Where(Parameters["fields_to_filter"], Parameters["operators"], Parameters["values"])}";
    }
}