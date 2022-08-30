using server.Enums;

namespace server.Components.Transformers;

public class Filter : Transformer
{
    public Filter()
    {
        Type = ComponentType.Filter;
    }

    private const string FieldsToFilter = "fields_to_filter";
    private const string Operators = "operators";
    private const string Values = "values";

    public override string GetQuery()
    {
        return
            $"{Pipeline.QueryBuilder.Select(new List<string> { "*" }, PreviousComponents[0].GetQuery(), Pipeline.QueryBuilder.NewAlias())} {Pipeline.QueryBuilder.Where(Parameters[FieldsToFilter], Parameters[Operators], Parameters[Values])}";
    }
}