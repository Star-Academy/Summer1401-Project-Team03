using server.Enums;
using server.Pipelines;

namespace server.Components.Transformers;

public class Filter : Transformer
{
    public Filter() : base()
    {
        Type = "filter";
    }

    public List<string> FieldsToFilter { get; set; }

    public List<Operator> Operators { get; set; }

    public List<object> Values { get; set; }

    public override string GetQuery()
    {
        return
            $"{QueryBuilder.Select(new List<string> {"*"}, PreviousComponents[0].GetQuery(), QueryBuilder.NewAlias())} {QueryBuilder.Where(FieldsToFilter, Operators, Values)}";
    }
}